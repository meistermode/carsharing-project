<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TariffController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tariffs', [TariffController::class, 'index']);
});
