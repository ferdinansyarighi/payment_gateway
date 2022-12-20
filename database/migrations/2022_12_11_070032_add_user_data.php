<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AddUserData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $data = [
            'name' => 'Ferdi',
            'email' => 'ferdinansyarighi@gmail.com',
            'level' => "admin",
            'password' => bcrypt('ferdi123'),
            'active_until'  => Carbon::now()
        ];
        DB::table('users')->insert($data);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('users')->where('email', 'ferdinansyarighi@gmail.com')->delete();
    }
}
