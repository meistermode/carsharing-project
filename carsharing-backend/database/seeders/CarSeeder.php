<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            [
                'id' => 1,
                'name' => 'Hyundai Solaris',
                'type' => 'Седан',
                'category' => 'эконом',
                'location' => 'ул. 20-летия Победы, 85',
                'price_per_minute' => 5,
                'rating' => 4.6,
                'features' => json_encode(['Автомат', 'Кондиционер', 'Apple CarPlay']),
                'image' => '/images/cars/hyundai-solaris.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 2,
                'name' => 'Volkswagen Polo',
                'type' => 'Седан',
                'category' => 'эконом',
                'location' => 'ул. Северная, 31',
                'price_per_minute' => 5,
                'rating' => 4.5,
                'features' => json_encode(['Климат-контроль', 'Android Auto', 'Парктроник']),
                'image' => '/images/cars/volkswagen-polo.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 3,
                'name' => 'Skoda Octavia',
                'type' => 'Седан',
                'category' => 'комфорт',
                'location' => 'ул. Калийная, 138А',
                'price_per_minute' => 7,
                'rating' => 4.7,
                'features' => json_encode(['Автомат', 'Климат-контроль', 'Круиз-контроль']),
                'image' => '/images/cars/skoda-octavia.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 4,
                'name' => 'Kia K5',
                'type' => 'Седан',
                'category' => 'бизнес',
                'location' => 'ул. Революции, 53',
                'price_per_minute' => 8,
                'rating' => 4.7,
                'features' => json_encode(['Автомат', 'Кожаный салон', 'Apple CarPlay']),
                'image' => '/images/cars/kia-k5.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 5,
                'name' => 'Toyota Camry',
                'type' => 'Седан',
                'category' => 'бизнес',
                'location' => 'ул. Всеобуча, 106',
                'price_per_minute' => 9,
                'rating' => 4.8,
                'features' => json_encode(['Автомат', 'Кожаный салон', 'Подогрев сидений']),
                'image' => '/images/cars/toyota-camry.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 6,
                'name' => 'Renault Logan',
                'type' => 'Седан',
                'category' => 'эконом',
                'location' => 'ул. Молодёжной, 16',
                'price_per_minute' => 4,
                'rating' => 4.3,
                'features' => json_encode(['Механика', 'Кондиционер', 'USB']),
                'image' => '/images/cars/renault-logan.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 7,
                'name' => 'Mazda 6',
                'type' => 'Седан',
                'category' => 'бизнес',
                'location' => 'ул. Карналлитовая, 85',
                'price_per_minute' => 8,
                'rating' => 4.7,
                'features' => json_encode(['Автомат', 'Bose аудио', 'Камера заднего вида']),
                'image' => '/images/cars/mazda-6.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 8,
                'name' => 'Kia Rio',
                'type' => 'Седан',
                'category' => 'эконом',
                'location' => 'ул. Черняховского, 7',
                'price_per_minute' => 5,
                'rating' => 4.4,
                'features' => json_encode(['Автомат', 'Кондиционер', 'Bluetooth']),
                'image' => '/images/cars/kia-rio.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 9,
                'name' => 'Honda Civic',
                'type' => 'Седан',
                'category' => 'комфорт',
                'location' => 'ул. Коммунистическая, 21В',
                'price_per_minute' => 7,
                'rating' => 4.6,
                'features' => json_encode(['Автомат', 'Климат-контроль', 'CarPlay']),
                'image' => '/images/cars/honda-civic.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 10,
                'name' => 'BMW M3',
                'type' => 'Купе',
                'category' => 'спорт',
                'location' => 'ул. Матросова, 8А',
                'price_per_minute' => 15,
                'rating' => 4.9,
                'features' => json_encode(['Спортивный режим', 'M Performance', 'Launch Control']),
                'image' => '/images/cars/bmw-m3.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 11,
                'name' => 'Nissan X-Trail',
                'type' => 'Кроссовер',
                'category' => 'кроссовер',
                'location' => 'ул. Большевистская, 63',
                'price_per_minute' => 10,
                'rating' => 4.7,
                'features' => json_encode(['Полный привод', 'Климат-контроль', 'Панорамная крыша']),
                'image' => '/images/cars/nissan-xtrail.jpg',
                'is_booked' => false,
                'is_new' => false
            ],
            [
                'id' => 12,
                'name' => 'Tesla Model 3',
                'type' => 'Седан',
                'category' => 'электро',
                'location' => 'ул. Набережная, 127',
                'price_per_minute' => 12,
                'rating' => 4.8,
                'features' => json_encode(['Автопилот', 'Панорамная крыша', 'Быстрая зарядка']),
                'image' => '/images/cars/tesla-model3.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 13,
                'name' => 'Mercedes-AMG GT R',
                'type' => 'Купе',
                'category' => 'премиум спорт',
                'location' => 'ул. Володарского, 44',
                'price_per_minute' => 20,
                'rating' => 5.0,
                'features' => json_encode(['AMG Performance', 'Спортивный выхлоп', 'Race Start']),
                'image' => '/images/cars/mercedes-amg-gtr.jpg',
                'is_booked' => false,
                'is_new' => true
            ],
            [
                'id' => 14,
                'name' => 'BMW 7 Series',
                'type' => 'Седан',
                'category' => 'премиум',
                'location' => 'проспект Строителей, 8',
                'price_per_minute' => 25,
                'rating' => 5.0,
                'features' => json_encode(['Массаж сидений', 'Панорамная крыша', 'Премиум аудио']),
                'image' => '/images/cars/bmw-7series.jpg',
                'is_booked' => false,
                'is_new' => false
            ]
        ];

        foreach ($cars as $carData) {
            Car::create($carData);
        }
    }
}
