import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";

export const activateGuard: CanActivateFn = 
    (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
        return false;
        //return inject(AuthService).loginSignal();
    };