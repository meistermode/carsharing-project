<?php

namespace App\Models;

// ...

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'first_name',
        'last_name',
        'phone',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
        'features' => 'array' // Для корректной работы с JSON
    ];


    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}