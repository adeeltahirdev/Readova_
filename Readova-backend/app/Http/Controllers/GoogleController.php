<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Borrow;
use Carbon\Carbon;
use App\Models\Rating;
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
        $limit = $request->input('limit', 50);

        $books = Books::query()
            ->when($query, function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('authors', 'like', "%{$query}%")
                  ->orWhere('categories', 'like', "%{$query}%");
            })
            ->limit($limit)
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
}
