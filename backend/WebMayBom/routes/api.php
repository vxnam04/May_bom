<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes dành cho người dùng đã đăng nhập
Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Routes dành riêng cho admin, có prefix "admin"
Route::middleware(['jwt.auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index']);       // Lấy danh sách user
    Route::post('/users', [UserController::class, 'store']);      // Thêm user
    Route::put('/users/{id}', [UserController::class, 'update']); // Cập nhật user
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Xóa user
});
