<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login_v');
});

Route::get('login', [AuthController::class, 'index'])->name('login');
Route::post('proses_login', [AuthController::class, 'proses_login'])->name('proses_login');
Route::get('logout', [AuthController::class, 'logout'])->name('logout');
Route::get('register', [AuthController::class, 'register'])->name('register');

Route::group(['middleware' => ['auth']], function() {

    Route::group(['middleware' => ['cek_login:admin']], function(){
        Route::get('dashboard_admin', [DashboardController::class, 'admin'])->name('dashboard_admin');
        Route::get('payment_json', [DashboardController::class, 'json'])->name('payment_json');
    });

    Route::group(['middleware' => ['cek_login:user']], function(){
        Route::get('dashboard', [DashboardController::class, 'user'])->name('dashboard');
    });

});