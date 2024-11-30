<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function show(Request $request)
    {   
        $user = Auth::user();

        return response()->json([
            'name' => $user->first_name . ' ' . $user->last_name,
            'email' => $user->email,
        ]);
    }


    public function update(Request $request)
    {
        $user = Auth::user();


        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id, // unique email except current user
        ]);


        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $request->validate([
                'password' => 'string|min:8|confirmed'
            ]);
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['user' => $user], 200);
    }

}