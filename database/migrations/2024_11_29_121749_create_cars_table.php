<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->string('category');
            $table->string('location');
            $table->decimal('price_per_minute', 8, 2);
            $table->decimal('rating', 3, 1);
            $table->json('features');
            $table->string('image');
            $table->boolean('is_booked')->default(false);
            $table->boolean('is_new')->default(false);
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};