<?php

use Illuminate\Database\Seeder;

class PermissionTableSeeder extends Seeder
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
    			'name' => 'view',
    			'label' => 'View any data'
    		],
    		[
    			'name' => 'edit',
    			'label' => 'Edit any form'
    		],
    		[
    			'name' => 'delete',
    			'label' => 'Delete any record'
    		]
    	];
        \DB::table('permissions')->insert($data);
    }
}
