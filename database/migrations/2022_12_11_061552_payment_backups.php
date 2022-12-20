<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PaymentBackups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_backups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->bigInteger('reff_no')->unique();
            $table->string('code')->nullable();
            $table->dateTime('expiry_date');
            $table->enum('status', array('paid','unpaid','expired'));
            $table->bigInteger('amount');
            $table->dateTime('paid_date')->nullable();
            $table->bigInteger('no_hp')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('payment_backups');
    }
}
