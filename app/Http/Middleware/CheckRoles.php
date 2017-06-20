<?php

namespace App\Http\Middleware;

use Closure;

class CheckRoles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if($request->user() === null)
            return response('Insufficient Permissions', 401);

        $actions = $request->route()->getAction();
        $roles = (isset($actions['roles'])) ? $actions['roles'] : null;
        //dd($request->user());
        if($request->user()->hasRole($roles))
            return $next($request);
        
        return response('Insufficient Permissions', 401);

    }
}
