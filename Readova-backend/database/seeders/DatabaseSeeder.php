<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'System Admin',
            'email' => 'system-admin@readova.com',
            'password' => '$2y$12$25htsejEzu7zG4sCzWiD0u6RD5HE1PcpqUKMY/yCKTG4nd7y6VPJa',
            'is_admin' => true,
        ]);
        //admin@readova
        $this->call([
            TypeSeeder::class,
        ]);
    }
}
