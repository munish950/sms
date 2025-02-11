import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";

export const activateGuard: CanActivateFn = 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
        return false;
    };