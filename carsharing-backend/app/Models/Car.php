<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'category',
        'location',
        'price_per_minute',
        'rating',
        'features',
        'image',
        'is_booked',
        'is_new'
    ];

    protected $casts = [
        'features' => 'array' // Для корректной работы с JSON
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}