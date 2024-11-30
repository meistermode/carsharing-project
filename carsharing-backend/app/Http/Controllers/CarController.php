<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{
    public function index()
    {
        return Car::all();
    }

    public function getStatuses()
    {
        $now = now();
        
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
                $booking->status = 'completed';
            } else {
                $booking->status = 'active';
            }
            $booking->save();

            $activeBookingsCount = Booking::where('car_id', $booking->car_id)
                ->where('start_time', '<=', $now)
                ->where('end_time', '>=', $now)
                ->count();

            $car = $booking->car;
            if ($car) {
                $car->is_booked = ($activeBookingsCount > 0);
                $car->save();
            }
        }

        $cars = Car::all();
        foreach ($cars as $car) {
            $activeBookingsCount = Booking::where('car_id', $car->id)
                ->where('start_time', '<=', $now)
                ->where('end_time', '>=', $now)
                ->count();
            
            $car->is_booked = ($activeBookingsCount > 0);
            $car->save();
        }

        return Car::select('id', 'is_booked')->get();
    }
}