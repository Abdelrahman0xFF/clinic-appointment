import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.isAuthenticated()) {
        return true;
    }

    if (!auth.loading()) {
        return router.parseUrl('/admin/login');
    }

    return auth.checkAuth().pipe(
        take(1),
        map((isAuth) => {
            if (isAuth) {
                return true;
            }
            return router.parseUrl('/admin/login');
        }),
    );
};
