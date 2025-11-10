<?php

use App\Http\Controllers\GoogleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserPriceController;
use PgSql\Lob;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [LoginController::class, 'show']);
Route::post('register', [LoginController::class, 'create']);
Route::post('delete', [LoginController::class, 'destroy']);
Route::get('/user', [LoginController::class, 'me']);

Route::get('/books', [GoogleController::class, 'index']);
Route::get('/showbooks', [GoogleController::class, 'show']);

Route::get('/books/{id}', [GoogleController::class, 'detail']);  
Route::post('/subscribeplan', [UserPriceController::class, 'store']);