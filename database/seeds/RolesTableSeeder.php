<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$data = [
    		[
    			'name' => 'super_admin',
    			'label' => 'Super admin can manage hole application'
    		],
    		[
    			'name' => 'admin',
    			'label' => 'Admin can manage based on super admin permission'
    		],
    		[
    			'name' => 'site_manager',
    			'label' => 'Site Manager'
    		]
    	];
        \DB::table('roles')->insert($data);
    }
}
