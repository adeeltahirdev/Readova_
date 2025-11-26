<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Books;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class SubscriptionController extends Controller
{
    public function getBooks()
    {
        $books = Books::all();
        return response()->json(['books' => $books], 200);
    }
    public function checkout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'plan_type' => 'required|in:basic,premium',
            'price' => 'required|numeric',
            'selected_books' => 'nullable|array',
            'selected_books.*' => 'integer|exists:books,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input', 'errors' => $validator->errors()], 422);
        }
        $activeSub = Subscription::where('user_id', $request->input('user_id'))
            ->where('expiry_date', '>', Carbon::now())
            ->first();

        if ($activeSub) {
            return response()->json([
                'message' => 'You already have a Plan. Please Contact the Administrator.'
            ], 403);
        }
        $plan = $request->input('plan_type');
        $selectedBooks = $request->input('selected_books', []);

        if ($plan === 'basic' && count($selectedBooks) > 10) {
            return response()->json(['message' => 'You can select up to 10 books only for the basic plan'], 422);
        }

        $expiryDate = Carbon::now()->addMonth();

        $subscription = Subscription::updateOrCreate(
            ['user_id' => $request->input('user_id')],
            [
                'plan_type' => $plan,
                'selected_books' => $plan === 'premium' ? null : $selectedBooks,
                'price' => $request->input('price'),
                'expiry_date' => $expiryDate,
            ]
        );

        return response()->json(['message' => 'Subscription successful', 'subscription' => $subscription], 200);
    }
}