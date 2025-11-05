<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('types')->insert([
            [
                'name' => 'borrow',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'subscription1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'subscription2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
