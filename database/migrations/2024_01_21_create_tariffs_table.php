<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tariffs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('price_per_minute');
            $table->json('cars');
            $table->json('features');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tariffs');
    }
};
