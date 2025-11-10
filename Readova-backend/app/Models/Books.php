<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    protected $fillable = [
        'google_id',
        'title',
        'authors',
        'description',
        'thumbnail',
        'categories',
        'published_date',
        'info_link',
        'price'
    ];
}
