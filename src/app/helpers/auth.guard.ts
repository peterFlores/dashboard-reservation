import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

//import { AuthenticationService } from './../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log(currentUser);
        if (currentUser) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.log("entro");
        const currentUser = this.authenticationService.currentUserValue;

        if (!currentUser) {
            
            return false;
        }

        const roles = route.data && route.data.roles as [{ "CLIENT", "USER"}];
        console.log(roles);
        if (roles && !roles.some(r => this.authenticationService.hasRole(r))) {
            return false;
        }
        return true;
    }
}