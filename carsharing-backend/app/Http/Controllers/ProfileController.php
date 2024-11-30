<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        try {
            $user = $request->user();
            
            $validated = $request->validate([
                'first_name' => 'nullable|string|max:255',
                'last_name' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:20',
                'avatar' => 'nullable|image|mimes:jpeg,png|max:2048'
            ]);

            if ($request->hasFile('avatar')) {
                try {
                    // Удаляем старый аватар
                    if ($user->avatar) {
                        Storage::disk('public')->delete($user->avatar);
                    }

                    // Сохраняем новый аватар
                    $path = $request->file('avatar')->store('avatars', 'public');
                    $user->avatar = $path;
                } catch (\Exception $e) {
                    Log::error('Ошибка при обработке аватара: ' . $e->getMessage());
                    return response()->json([
                        'message' => 'Ошибка при загрузке аватара',
                        'error' => $e->getMessage()
                    ], 500);
                }
            }

            // Обновляем остальные поля
            $user->fill([
                'first_name' => $validated['first_name'] ?? $user->first_name,
                'last_name' => $validated['last_name'] ?? $user->last_name,
                'phone' => $validated['phone'] ?? $user->phone
            ]);

            $user->save();

            return response()->json([
                'message' => 'Профиль успешно обновлен',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка при обновлении профиля: ' . $e->getMessage());
            return response()->json([
                'message' => 'Произошла ошибка при обновлении профиля',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function removeAvatar(Request $request)
    {
        try {
            $user = $request->user();
            
            // Удаляем старый аватар из хранилища
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Очищаем поле аватара в базе данных
            $user->avatar = null;
            $user->save();

            return response()->json([
                'message' => 'Аватар успешно удален',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка при удалении аватара: ' . $e->getMessage());
            return response()->json([
                'message' => 'Не удалось удалить аватар',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
