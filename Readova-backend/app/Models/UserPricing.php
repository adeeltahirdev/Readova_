<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPricing extends Model
{
    use HasFactory;
    protected $table = 'user_pricing';
    protected $fillable = [
        'user_id',
        'type_id',
        'price',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }
}
