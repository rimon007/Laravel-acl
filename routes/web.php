<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Auth::logout();
Auth::loginUsingId(1);
//Auth::loginUsingId(3);
Route::get('/', function () {

    return view('super-admin.index');
});

	Route::get('login', 'LoginController@getLogin');
	Route::post('login', 'LoginController@postLogin');


Route::group(['prefix' => 'super-admin','middleware' => ['auth', 'roles'], 'roles' => 'super_admin'], function() {
	Route::get('dashboard', ['uses' => 'UserRoleController@show']);
});

Route::group(['prefix' => 'admin','middleware' => ['auth', 'roles'], 'roles' => 'admin'], function() {
	Route::get('dashboard', ['uses' => 'UserRoleController@show']);
});

Route::group(['prefix' => 'site-manager','middleware' => ['auth', 'roles'], 'roles' => 'site_manager'], function() {
	Route::get('dashboard', ['uses' => 'UserRoleController@show']);
});


Route::get('/role-user', ['middleware' => ['roles'], 'roles' => ['admin', 'site_manager'], 'uses' => 'UserRoleController@index']);

//Route::get('/super-admin', ['middleware' => ['roles'], 'roles' => ['super_admin'], 'uses' => 'UserRoleController@show']);
