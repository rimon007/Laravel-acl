<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Schema::disableForeignKeyConstraints();
        \DB::table('permission_role')->truncate();
        \DB::table('role_user')->truncate();
        \DB::table('roles')->truncate();
        \DB::table('permissions')->truncate();
        $this->call(RolesTableSeeder::class);
        $this->call(PermissionTableSeeder::class);
        Schema::enableForeignKeyConstraints();
    }
}
