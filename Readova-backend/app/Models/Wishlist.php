<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id'
    ];

    // Link to the Book details
    public function book()
    {
        return $this->belongsTo(Books::class, 'book_id');
    }

    // Link to the User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}