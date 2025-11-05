<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Type;

class UserPriceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'type_id' => 'required|integer|exists:types,id',
            'price'   => 'required|numeric|min:0',
        ]);

        $user = User::findOrFail($validatedData['user_id']);
        $type = Type::findOrFail($validatedData['type_id']);
        $typeName = strtolower($type->name);

        if (str_starts_with($typeName, 'subscription')) {
            $existingSubscription = $user->user_pricings()
                ->whereHas('type', function ($query) {
                    $query->where('name', 'like', 'subscription%');
                })
                ->exists();

            if ($existingSubscription) {
                return response()->json([
                    'message' => 'User already has an active subscription plan.',
                    'user_id' => $user->id,
                    'user_name' => $user->name,
                    'type_id' => $type->id,
                    'type_name' => $type->name,
                ], 409);
            }
            $pricing = $user->user_pricings()->create([
                'type_id' => $type->id,
                'price'   => $validatedData['price'],
            ]);
        }
        elseif ($typeName === 'borrow') {
            $pricing = $user->user_pricings()->create([
                'type_id' => $type->id,
                'price'   => $validatedData['price'],
            ]);
        }
        else {
            return response()->json([
                'message' => 'Invalid type. Must be borrow or subscription type.',
            ], 400);
        }

        return response()->json([
            'message'     => 'User pricing saved successfully.',
            'user_id'     => $user->id,
            'user_name'   => $user->name,
            'type_id'     => $type->id,
            'type_name'   => $type->name,
            'price'       => $pricing->price,
        ]);
    }
}
