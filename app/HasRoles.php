<?php 

namespace App;

trait HasRoles {
	public function roles() {
        return $this->belongsToMany(Role::class);
    }

    public function assignRole($role) {
        return $this->roles()->save(
            Role::whereName($role)->firstOrFail()
        );
    }

    public function hasRole($role) {
    	if(empty($role))
    		return false;

        if(is_string($role)) 
            return $this->roles->contains('name', $role); 

        foreach($role as $r) {
        	$attr = (isset($r->name)) ? $r->name : $r;
		    if ($this->hasRole($attr)) {
		        return true;
		    }
		}

		return false;
    }
}