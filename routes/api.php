<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/order', 'App\Http\Controllers\API\PaymentController@order_payment');
Route::get('/payment', 'App\Http\Controllers\API\PaymentController@payment');
Route::get('/status', 'App\Http\Controllers\API\PaymentController@status');

// /user/{id}