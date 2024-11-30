<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tariff extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price_per_minute',
        'cars',
        'features'
    ];

    protected $casts = [
        'cars' => 'array',
        'features' => 'array'
    ];
}
