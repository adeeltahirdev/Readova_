<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\UserPricing;
class Type extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];
}
