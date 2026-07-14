import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentEye, fluentEyeOff, fluentLockClosed, fluentPerson } from '@ng-icons/fluent-ui';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    viewProviders: [provideIcons({ fluentLockClosed, fluentPerson, fluentEye, fluentEyeOff })],
    selector: 'app-login',
    imports: [NgIcon, RouterLink],
    template: `
        <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                <div class="text-center mb-8">
                    <a routerLink="/" class="inline-flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <span class="text-white font-bold text-xl">MC</span>
                        </div>
                        <div class="text-left">
                            <h2 class="font-bold text-slate-900 text-lg leading-tight">MediCare</h2>
                            <p class="text-xs text-slate-500 leading-tight">Admin Panel</p>
                        </div>
                    </a>
                    <h1 class="text-2xl font-bold text-slate-900">Welcome back</h1>
                    <p class="text-slate-500 mt-1">Sign in to manage your clinic</p>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div class="space-y-4">
                        <div>
                            <label for="username" class="block text-sm font-medium text-slate-900 mb-1.5">
                                Username
                            </label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <ng-icon name="fluentPerson" size="18" />
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    [value]="username()"
                                    (input)="username.set($any($event.target).value)"
                                    (keydown.enter)="handleLogin()"
                                    placeholder="Enter your username"
                                    class="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-slate-900 mb-1.5">
                                Password
                            </label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <ng-icon name="fluentLockClosed" size="18" />
                                </span>
                                <input
                                    id="password"
                                    [type]="showPassword() ? 'text' : 'password'"
                                    [value]="password()"
                                    (input)="password.set($any($event.target).value)"
                                    (keydown.enter)="handleLogin()"
                                    placeholder="Enter your password"
                                    class="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    (click)="showPassword.set(!showPassword())"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    <ng-icon [name]="showPassword() ? 'fluentEyeOff' : 'fluentEye'" size="18" />
                                </button>
                            </div>
                        </div>

                        @if (error()) {
                            <div class="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                                {{ error() }}
                            </div>
                        }

                        <button
                            type="button"
                            (click)="handleLogin()"
                            [disabled]="loading()"
                            class="w-full h-9 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            @if (loading()) {
                                <span class="flex items-center gap-2">
                                    <span class="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Signing in...
                                </span>
                            } @else {
                                Sign in
                            }
                        </button>
                    </div>
                </div>

                <p class="text-center text-xs text-slate-400 mt-6">
                    &copy; {{ currentYear }} MediCare Clinic. All rights reserved.
                </p>
            </div>
        </div>
    `,
})
export class LoginPage {
    private auth = inject(AuthService);
    private router = inject(Router);

    username = signal('');
    password = signal('');
    showPassword = signal(false);
    loading = signal(false);
    error = signal('');
    currentYear = new Date().getFullYear();

    handleLogin(): void {
        if (!this.username() || !this.password()) {
            this.error.set('Please enter both username and password');
            return;
        }

        this.loading.set(true);
        this.error.set('');

        this.auth.login(this.username(), this.password()).subscribe({
            next: () => {
                this.loading.set(false);
                this.router.navigate(['/admin/dashboard']);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(err.error?.message || 'Invalid credentials. Please try again.');
            },
        });
    }
}
