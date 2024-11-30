<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TariffsTableSeeder extends Seeder
{
    public function run()
    {
        $tariffs = [
            [
                'name' => 'Эконом',
                'description' => 'Доступные автомобили для повседневных поездок',
                'price_per_minute' => '4-5',
                'cars' => json_encode(['Hyundai Solaris', 'Volkswagen Polo', 'Renault Logan', 'Kia Rio']),
                'features' => json_encode([
                    'Автомат/механика',
                    'Кондиционер',
                    'Базовая страховка',
                    'Бесплатная парковка в зоне завершения аренды'
                ]),
            ],
            [
                'name' => 'Комфорт',
                'description' => 'Автомобили повышенного комфорта для важных встреч',
                'price_per_minute' => '7',
                'cars' => json_encode(['Skoda Octavia', 'Honda Civic']),
                'features' => json_encode([
                    'Автомат',
                    'Климат-контроль',
                    'Расширенная страховка',
                    'Бесплатная парковка в зоне завершения аренды',
                    'Премиум аудиосистема'
                ]),
            ],
            [
                'name' => 'Бизнес',
                'description' => 'Престижные автомобили для бизнес-встреч',
                'price_per_minute' => '8-9',
                'cars' => json_encode(['Kia K5', 'Toyota Camry', 'Mazda 6']),
                'features' => json_encode([
                    'Автомат',
                    'Климат-контроль',
                    'Кожаный салон',
                    'Полная страховка',
                    'Бесплатная парковка по всему городу',
                    'Премиум аудиосистема',
                    'Приоритетная поддержка'
                ]),
            ],
            [
                'name' => 'Премиум',
                'description' => 'Премиальные автомобили для особых случаев',
                'price_per_minute' => '20-25',
                'cars' => json_encode(['Mercedes-AMG GT R', 'BMW 7 Series']),
                'features' => json_encode([
                    'Автомат',
                    'Климат-контроль',
                    'Кожаный салон премиум-класса',
                    'Премиальная аудиосистема',
                    'Полная страховка без франшизы',
                    'Бесплатная парковка по всему городу',
                    'VIP-поддержка 24/7',
                    'Консьерж-сервис'
                ]),
            ],
        ];

        foreach ($tariffs as $tariff) {
            DB::table('tariffs')->insert($tariff);
        }
    }
}
