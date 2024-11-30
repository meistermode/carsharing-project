<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tariff;

class TariffController extends Controller
{
    public function index()
    {
        return Tariff::all();
    }
}
