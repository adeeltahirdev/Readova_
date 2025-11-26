<?php

use App\Http\Controllers\GoogleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserPriceController;
use PgSql\Lob;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [LoginController::class, 'show']);
Route::post('register', [LoginController::class, 'create']);
Route::post('delete', [LoginController::class, 'destroy']);
Route::get('/user', [LoginController::class, 'me']);
Route::get('/allusers', [LoginController::class, 'index']);
Route::get('/books', [GoogleController::class, 'index']);
Route::get('/showbooks', [GoogleController::class, 'show']);
Route::delete('deletebooks/{id}', [GoogleController::class, 'destroy']);

Route::post('/rate', [GoogleController::class, 'rateBook']);
Route::get('/books/{id}', [GoogleController::class, 'detail']);
Route::post('/borrow', [GoogleController::class, 'borrowBook']);

Route::get('/subscriptions/books', [SubscriptionController::class, 'getBooks']);
Route::post('/subscriptions/checkout', [SubscriptionController::class, 'checkout']);

Route::post('/wishlist/toggle', [GoogleController::class, 'toggleWishlist']);
Route::get('/wishlist', [GoogleController::class, 'getWishlist']);
Route::get('/wishlist/check/{id}', [GoogleController::class, 'checkWishlistStatus']);

Route::get('/library/my-books', [GoogleController::class, 'getMyLibrary']);

Route::get('/notifications', [GoogleController::class, 'getNotifications']);