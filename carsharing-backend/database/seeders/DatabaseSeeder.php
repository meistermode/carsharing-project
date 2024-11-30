<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\CarSeeder;
use Database\Seeders\TariffsTableSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CarSeeder::class,
            TariffsTableSeeder::class,
            // Другие сидеры
        ]);

        User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]);

        // Создаем еще несколько пользователей
        User::factory(5)->create();
    }
}
