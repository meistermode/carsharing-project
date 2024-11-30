<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{



     public function index(Request $request)
    {
        $user = Auth::user();
        $now = now();

        Log::info('Fetching bookings for user:', ['user_id' => $user->id]);

        // Получаем все бронирования пользователя
        $bookings = $user->bookings()->with('car')->get()->map(function($booking) use ($now) {
            Log::info('Processing booking:', [
                'booking_id' => $booking->id,
                'car_id' => $booking->car_id,
                'start_time' => $booking->start_time,
                'end_time' => $booking->end_time,
                'current_time' => $now
            ]);

            // Определяем статус более точно
            if ($booking->start_time <= $now && $now <= $booking->end_time) {
                $booking->status = 'active';
                Log::info('Booking is active');
            } elseif ($booking->end_time < $now) {
                $booking->status = 'completed';
                Log::info('Booking is completed');
            } else {
                $booking->status = 'upcoming';
                Log::info('Booking is upcoming');
            }
            $booking->save();

            // Проверяем все активные бронирования для этой машины
            $activeBookingsCount = Booking::where('car_id', $booking->car_id)
                ->where('start_time', '<=', $now)
                ->where('end_time', '>=', $now)
                ->count();

            Log::info('Active bookings count for car:', [
                'car_id' => $booking->car_id,
                'active_bookings' => $activeBookingsCount
            ]);

            // Обновляем статус машины
            if ($booking->car) {
                $booking->car->is_booked = ($activeBookingsCount > 0);
                $booking->car->save();
                
                Log::info('Updated car status:', [
                    'car_id' => $booking->car_id,
                    'is_booked' => $booking->car->is_booked
                ]);
            }

            return $booking;
        });

        return $bookings;
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'car_id' => 'required|exists:cars,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'extras' => 'nullable|array',
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }



        $car = Car::findOrFail($request->car_id);
        if ($car->is_booked) {
            return response()->json(['error' => 'Car is already booked'], 422);
        }


        $booking = new Booking();
        $booking->user_id = Auth::id();
        $booking->car_id = $request->car_id;
        $booking->start_time = $request->start_time;
        $booking->end_time = $request->end_time;
        $booking->extras = $request->extras;
        // здесь будет подсчет цены
        $booking->total_price = $this->calculatePrice($request, $car);
        $booking->save();


        $car->is_booked = true;
        $car->save();

        return response()->json($booking, 201);
    }



    // Вспомогательная функция для расчета цены
    private function calculatePrice(Request $request, Car $car)
    {
        $startTime = strtotime($request->start_time);
        $endTime = strtotime($request->end_time);
        $durationMinutes = ($endTime - $startTime) / 60;


        $totalPrice = $durationMinutes * $car->price_per_minute;

        if ($request->extras) {
            $totalPrice += collect($request->extras)->sum('price');
        }


        return $totalPrice;
    }

    public function updateBookingStatus()
    {
        $now = now();
        
        // Находим все бронирования, которые требуют обновления статуса
        $bookingsToUpdate = Booking::where(function($query) use ($now) {
            $query->where('end_time', '<', $now)
                  ->where('status', 'active');
        })->orWhere(function($query) use ($now) {
            $query->where('start_time', '<=', $now)
                  ->where('end_time', '>=', $now)
                  ->where('status', '!=', 'active');
        })->get();

        foreach ($bookingsToUpdate as $booking) {
            if ($booking->end_time < $now) {
                // Завершаем просроченные бронирования
                $booking->status = 'completed';
                $car = $booking->car;
                $car->is_booked = false;
                $car->save();
            } else {
                // Активируем начавшиеся бронирования
                $booking->status = 'active';
                $car = $booking->car;
                $car->is_booked = true;
                $car->save();
            }
            $booking->save();
        }

        return response()->json([
            'updated_bookings' => $bookingsToUpdate->count()
        ]);
    }

}