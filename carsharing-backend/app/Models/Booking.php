<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'start_time',
        'end_time',
        'total_price',
        'extras',
        'status'
    ];


    protected $casts = [
        'extras' => 'array', // для работы с JSON
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'status' => 'string'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}