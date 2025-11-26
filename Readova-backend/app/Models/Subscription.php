<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_type',
        'selected_books',
        'price',
        'expiry_date',
    ];

    protected $casts = [
        'selected_books' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}