<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Borrow;
use App\Models\Subscription;
use App\Models\Rating;
use App\Models\Wishlist;
use Carbon\Carbon;

class GoogleController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q', '');
        $maxResults = $request->input('maxResults', 20);
        $apiKey = env('GOOGLE_BOOKS_API_KEY');
        $response = Http::withoutVerifying()->get('https://www.googleapis.com/books/v1/volumes', [
            'q' => $query,
            'maxResults' => $maxResults,
            'key' => $apiKey,
        ]);
        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch books'], 500);
        }
        $books = collect($response->json('items', []))
            ->filter(function ($item) {
                $access = $item['accessInfo'] ?? [];
                $pdfAvailable = $access['pdf']['isAvailable'] ?? false;
                $isViewable = in_array($access['viewability'] ?? '', ['ALL_PAGES', 'FULL']);
                return $pdfAvailable || $isViewable;
            })
            ->map(function ($item) {
                $info = $item['volumeInfo'] ?? [];
                return [
                    'google_id'     => $item['id'] ?? null,
                    'title'         => $info['title'] ?? 'No title',
                    'authors'       => $info['authors'][0] ?? 'Unknown',
                    'description'   => $info['description'] ?? 'No description',
                    'thumbnail'     => $info['imageLinks']['thumbnail'] ?? null,
                    'categories'    => $info['categories'][0] ?? 'General',
                    'publishedDate' => $info['publishedDate'] ?? null,
                    'infoLink'      => $info['infoLink'] ?? null,
                    'page_count'    => $info['pageCount'] ?? 0,
                ];
            })
            ->values();
        foreach ($books as $bookData) {
            if (!empty($bookData['google_id'])) {
                Books::updateOrCreate(
                    [
                        'google_id' => $bookData['google_id'],
                        'info_link' => $bookData['infoLink'],
                        'page_count' => $bookData['page_count'],
                        'published_date' => $bookData['publishedDate'],
                        'price' => number_format(mt_rand(1000, 5000) / 100, 2, '.', '')
                    ],
                    $bookData
                );
            }
        }
        return response()->json([
            'total' => count($books),
            'books' => $books,
        ]);
    }
    public function rateBook(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'rating'  => 'required|integer|min:1|max:5',
        ]);
        Rating::updateOrCreate(
            [
                'user_id' => $request->user_id,
                'book_id' => $request->book_id
            ],
            [
                'rating' => $request->rating
            ]
        );

        return response()->json(['message' => 'Rating saved successfully']);
    }
    public function detail(Request $request, $id)
    {
        $book = Books::withAvg('ratings', 'rating')->find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        $book->rating = round($book->ratings_avg_rating, 1) ?? 0;
        unset($book->ratings_avg_rating);
        $previewAccess = false;
        $userId = $request->query('user_id');

        if ($userId) {
            $now = Carbon::now();
            $activeBorrow = Borrow::where('user_id', $userId)
                ->where('book_id', $book->id)
                ->where('borrowed_at', '<=', $now)
                ->where('expires_at', '>=', $now)
                ->first();

            if ($activeBorrow) {
                $previewAccess = true;
            }
            if (!$previewAccess) {
                $subscription = Subscription::where('user_id', $userId)
                    ->where('expiry_date', '>', $now)
                    ->first();
                if ($subscription) {
                    if ($subscription->plan_type === 'premium') {
                        $previewAccess = true;
                    } elseif ($subscription->plan_type === 'basic') {
                        $selectedBooks = $subscription->selected_books ?? [];
                        if (in_array($book->id, $selectedBooks)) {
                            $previewAccess = true;
                        }
                    }
                }
            }
        }

        $googleId = $book->google_id ?? null;
        $previewLink = $googleId ? "https://books.google.com/books?id={$googleId}&printsec=frontcover" : null;

        return response()->json([
            'book' => $book,
            'google_id' => $googleId,
            'google_preview_link' => $previewLink,
            'preview_access' => $previewAccess,
        ]);
    }
    public function borrowBook(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'days'    => 'required|integer|min:1|max:30',
        ]);
        $activeSub = Borrow::where('user_id', $request->user_id)
            ->where('expires_at', '>', Carbon::now())
            ->first();
        if ($activeSub) {
            return response()->json([
                'message' => 'You already have Borrowed a Book. Please contact the Administrator.'
            ], 403);
        }

        $book = Books::find($request->book_id);
        $totalPrice = $book->price * $request->days;
        $borrow = Borrow::create([
            'user_id'     => $request->user_id,
            'book_id'     => $book->id,
            'price'       => $totalPrice,
            'borrowed_at' => Carbon::now(),
            'expires_at'  => Carbon::now()->addDays($request->days),
        ]);

        return response()->json([
            'message' => 'Book borrowed successfully!',
            'borrow' => $borrow
        ]);
    }
    public function show(Request $request)
    {
        $query = $request->input('q');
        $books = Books::withAvg('ratings', 'rating')
            ->when($query, function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('authors', 'like', "%{$query}%")
                    ->orWhere('categories', 'like', "%{$query}%");
            })
            ->get([
                'id',
                'google_id',
                'title',
                'authors',
                'description',
                'thumbnail',
                'categories',
                'published_date',
                'info_link',
                'page_count',
                'price',
            ]);
        $books->transform(function ($book) {
            $book->rating = $book->ratings_avg_rating ? round($book->ratings_avg_rating, 1) : null;
            unset($book->ratings_avg_rating);
            return $book;
        });

        return response()->json([
            'total' => $books->count(),
            'books' => $books,
        ]);
    }
    public function destroy($id)
    {
        $book = Books::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        $book->delete();
        return response()->json(['message' => 'Book deleted successfully']);
    }
    public function toggleWishlist(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
        ]);

        $userId = $request->user_id;
        $bookId = $request->book_id;

        $wishlist = Wishlist::where('user_id', $userId)
            ->where('book_id', $bookId)
            ->first();

        if ($wishlist) {
            $wishlist->delete();
            return response()->json(['message' => 'Removed from wishlist', 'status' => 'removed']);
        } else {
            Wishlist::create([
                'user_id' => $userId,
                'book_id' => $bookId
            ]);
            return response()->json(['message' => 'Added to wishlist', 'status' => 'added']);
        }
    }
    public function getWishlist(Request $request)
    {
        $userId = $request->query('user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID required'], 400);
        }

        $wishlists = Wishlist::with('book')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        $books = $wishlists->map(function ($item) {
            return $item->book;
        });

        return response()->json([
            'total' => $books->count(),
            'books' => $books
        ]);
    }
    public function checkWishlistStatus(Request $request, $id)
    {
        $userId = $request->query('user_id');

        if (!$userId) {
            return response()->json(['is_wishlisted' => false]);
        }

        $exists = Wishlist::where('user_id', $userId)
            ->where('book_id', $id)
            ->exists();

        return response()->json(['is_wishlisted' => $exists]);
    }
    public function getMyLibrary(Request $request)
    {
        $userId = $request->query('user_id');
        if (!$userId) return response()->json(['message' => 'User ID required'], 400);
        $now = Carbon::now();
        $borrowedRecords = Borrow::with('book')
            ->where('user_id', $userId)
            ->where('expires_at', '>=', $now)
            ->get();
        $borrowedBooks = $borrowedRecords->map(function ($record) {
            return $record->book;
        });
        $subscription = Subscription::where('user_id', $userId)
            ->where('expiry_date', '>', $now)
            ->first();
        $subscribedBooks = [];
        $planType = null;
        if ($subscription) {
            $planType = $subscription->plan_type;
            if ($subscription->plan_type === 'basic' && !empty($subscription->selected_books)) {
                $subscribedBooks = Books::whereIn('id', $subscription->selected_books)->get();
            }
        }
        return response()->json([
            'borrowed_books' => $borrowedBooks,
            'subscribed_books' => $subscribedBooks,
            'plan_type' => $planType
        ]);
    }
    public function getNotifications()
    {
        $latestBooks = Books::orderBy('created_at', 'desc')
            ->take(5)
            ->get(['id', 'title', 'created_at']);
        $notifications = $latestBooks->map(function ($book) {
            return [
                'id' => $book->id,
                'message' => "New book added: " . $book->title,
                'time' => Carbon::parse($book->created_at)->diffForHumans(),
                'type' => 'new_book'
            ];
        });
        return response()->json([
            'notifications' => $notifications,
            'count' => $notifications->count()
        ]);
    }
    public function getAdminStats()
    {
        $activeSubs = Subscription::where('expiry_date', '>', Carbon::now())->count();
        $subRevenue = Subscription::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->sum('price');
        $borrowRevenue = Borrow::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->sum('price');
        $recentBorrows = Borrow::with(['user', 'book'])
            ->orderBy('created_at', 'desc')
            ->get();
        $recentSubs = Subscription::with('user')
            ->orderBy('created_at', 'desc')
            ->get();
        $newUsers = \App\Models\User::orderBy('created_at', 'desc')
            ->get();
        return response()->json([
            'active_subscriptions' => $activeSubs,
            'monthly_revenue'      => $subRevenue+$borrowRevenue,
            'recent_borrows'       => $recentBorrows,
            'recent_subscriptions' => $recentSubs,
            'new_users'            => $newUsers
        ]);
    }
}
