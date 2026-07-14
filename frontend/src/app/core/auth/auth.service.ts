import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AdminApi } from '../api/admin/admin.service';
import { AdminDto } from '../api/admin/admin.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private adminApi = inject(AdminApi);
    private router = inject(Router);

    admin = signal<AdminDto | null>(null);
    isAuthenticated = signal(false);
    loading = signal(true);

    checkAuth(): Observable<boolean> {
        return this.adminApi.getProfile().pipe(
            map((res) => {
                if (res.success && res.data) {
                    this.admin.set(res.data);
                    this.isAuthenticated.set(true);
                    this.loading.set(false);
                    return true;
                }
                this.clearAuth();
                return false;
            }),
            catchError(() => {
                this.clearAuth();
                return of(false);
            }),
        );
    }

    login(username: string, password: string): Observable<boolean> {
        return new Observable((observer) => {
            this.adminApi.login({ username, password }).subscribe({
                next: (res) => {
                    if (res.success && res.data) {
                        this.admin.set(res.data.admin);
                        this.isAuthenticated.set(true);
                        this.loading.set(false);
                        observer.next(true);
                        observer.complete();
                    } else {
                        observer.next(false);
                        observer.complete();
                    }
                },
                error: (err) => {
                    observer.error(err);
                },
            });
        });
    }

    logout(): void {
        this.adminApi.logout().subscribe({
            next: () => {
                this.clearAuth();
                this.router.navigate(['/admin/login']);
            },
            error: () => {
                this.clearAuth();
                this.router.navigate(['/admin/login']);
            },
        });
    }

    private clearAuth(): void {
        this.admin.set(null);
        this.isAuthenticated.set(false);
        this.loading.set(false);
    }
}
