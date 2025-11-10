<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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
                ];
            })
            ->values();

        foreach ($books as $bookData) {
            if (!empty($bookData['google_id'])) {
                Books::updateOrCreate(
                    [
                    'google_id' => $bookData['google_id'], 
                    'info_link' => $bookData['infoLink'],
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
    public function detail($id)
    {
        $book = Books::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        // Ensure google_id exists; if not, you could set it to null or handle differently
        $googleId = $book->google_id ?? null;
        $previewLink = $googleId ? "https://books.google.com/books?id={$googleId}&printsec=frontcover" : null;
        return response()->json([
            'book' => $book,
            'google_id' => $googleId,  // Keep this for the viewer
            'google_preview_link' => $previewLink,  // Optional direct link
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
                'price',
            ]);
        return response()->json([
            'total' => $books->count(),
            'books' => $books,
        ]);
    }
}
