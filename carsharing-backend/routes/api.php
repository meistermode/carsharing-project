<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TariffController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Публичные маршруты
Route::get('/tariffs', [TariffController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/profile/update', [ProfileController::class, 'update']);
    Route::post('/profile/remove-avatar', [ProfileController::class, 'removeAvatar']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::post('/bookings/update-status', [BookingController::class, 'updateBookingStatus']);
    Route::get('/cars', [CarController::class, 'index']);
    Route::resource('user', UserController::class)->only(['show', 'update']);
});

// Пример, как добавить автомобили через Postman:
Route::post('/cars', function (Request $request) {

    $carData = $request->all();

    // Валидация данных
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'type' => 'required|string|max:255',
        'category' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'price_per_minute' => 'required|numeric',
        'rating' => 'required|numeric',
        'features' => 'required|json',
        'image' => 'required|string|max:255',
        'is_booked' => 'required|boolean',
        'is_new' => 'required|boolean',
    ]);

    // Создание автомобиля
    $car = Car::create($validatedData);

    return response()->json($car, 201);
});