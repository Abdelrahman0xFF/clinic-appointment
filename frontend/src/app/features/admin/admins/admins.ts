import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentAdd,
    fluentPerson,
    fluentDelete,
    fluentDismiss,
} from '@ng-icons/fluent-ui';
import { AdminApi } from '../../../core/api/admin/admin.service';
import { AdminDto } from '../../../core/api/admin/admin.types';
import { AuthService } from '../../../core/auth/auth.service';
import { UiButton } from '../../../shared/ui/button';

@Component({
    viewProviders: [provideIcons({ fluentAdd, fluentPerson, fluentDelete, fluentDismiss })],
    selector: 'app-admins',
    imports: [NgIcon, UiButton],
    template: `
        <div>
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-3xl font-bold text-slate-900">Admins</h1>
                    <p class="text-slate-500 mt-1">Manage admin accounts</p>
                </div>
                <app-button (click)="dialogOpen.set(true)">
                    <ng-icon name="fluentAdd" size="20" />
                    New Admin
                </app-button>
            </div>

            @if (loading()) {
                <div class="flex items-center justify-center py-16">
                    <span class="size-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></span>
                </div>
            } @else if (admins().length === 0) {
                <div class="flex flex-col items-center justify-center py-16 text-center">
                    <span class="size-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <ng-icon name="fluentPerson" size="24" class="text-slate-400" />
                    </span>
                    <h3 class="text-slate-900 font-semibold mb-1">No admins found</h3>
                    <p class="text-slate-500 text-sm">Create your first admin account</p>
                </div>
            } @else {
                <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="px-6 py-3 text-left font-semibold text-slate-900 text-sm">Username</th>
                                <th class="px-6 py-3 text-left font-semibold text-slate-900 text-sm">Created</th>
                                <th class="px-6 py-3 text-right font-semibold text-slate-900 text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200">
                            @for (admin of admins(); track admin.id) {
                                <tr class="hover:bg-slate-50 transition">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="size-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                                <span class="text-blue-600 font-bold text-sm">{{ admin.username.charAt(0).toUpperCase() }}</span>
                                            </div>
                                            <div>
                                                <p class="text-slate-900 font-medium text-sm">{{ admin.username }}</p>
                                                <p class="text-xs text-slate-400">ID: {{ admin.id }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-slate-500 text-sm">{{ formatDate(admin.createdAt) }}</td>
                                    <td class="px-6 py-4 text-right">
                                        @if (admin.username !== currentUsername) {
                                            <button
                                                type="button"
                                                (click)="confirmDelete(admin)"
                                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
                                            >
                                                <ng-icon name="fluentDelete" size="16" />
                                                Delete
                                            </button>
                                        } @else {
                                            <span class="text-xs text-slate-400 italic">You</span>
                                        }
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>

        @if (dialogOpen()) {
            <div
                class="fixed inset-0 z-50 flex items-start justify-center pt-12"
                tabindex="-1"
            >
                <div
                    class="fixed inset-0 bg-black/40"
                    (click)="dialogOpen.set(false)"
                    (keydown.enter)="dialogOpen.set(false)"
                    tabindex="0"
                ></div>
                <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 z-10">
                    <div class="flex items-center justify-between p-6 border-b border-slate-200">
                        <h2 class="text-lg font-bold text-slate-900">Create Admin</h2>
                        <button
                            type="button"
                            (click)="dialogOpen.set(false)"
                            class="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
                        >
                            <ng-icon name="fluentDismiss" size="20" />
                        </button>
                    </div>
                    <div class="p-6 space-y-4">
                        <div>
                            <label for="new-username" class="block text-sm font-medium text-slate-900 mb-1.5">Username</label>
                            <input
                                id="new-username"
                                type="text"
                                [value]="newUsername()"
                                (input)="newUsername.set($any($event.target).value)"
                                placeholder="Enter username"
                                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label for="new-password" class="block text-sm font-medium text-slate-900 mb-1.5">Password</label>
                            <input
                                id="new-password"
                                type="password"
                                [value]="newPassword()"
                                (input)="newPassword.set($any($event.target).value)"
                                placeholder="Min 8 chars, letter + number"
                                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div class="flex justify-end gap-3 p-6 border-t border-slate-200">
                        <app-button variant="outline" (click)="dialogOpen.set(false)">Cancel</app-button>
                        <app-button (click)="handleCreate()" [loading]="creating()">
                            Create Admin
                        </app-button>
                    </div>
                </div>
            </div>
        }
    `,
})
export class Admins {
    private adminApi = inject(AdminApi);
    private auth = inject(AuthService);

    admins = signal<AdminDto[]>([]);
    loading = signal(true);
    dialogOpen = signal(false);
    creating = signal(false);
    newUsername = signal('');
    newPassword = signal('');

    get currentUsername(): string {
        return this.auth.admin()?.username ?? '';
    }

    constructor() {
        this.loadAdmins();
    }

    loadAdmins(): void {
        this.adminApi.getAllAdmins().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    this.admins.set(res.data);
                }
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            },
        });
    }

    handleCreate(): void {
        const username = this.newUsername().trim();
        const password = this.newPassword();

        if (!username || username.length < 3) {
            return;
        }

        if (!password || password.length < 8) {
            return;
        }

        this.creating.set(true);

        this.adminApi.createAdmin({ username, password }).subscribe({
            next: (res) => {
                this.creating.set(false);
                if (res.success) {
                    this.dialogOpen.set(false);
                    this.newUsername.set('');
                    this.newPassword.set('');
                    this.loadAdmins();
                }
            },
            error: () => {
                this.creating.set(false);
            },
        });
    }

    confirmDelete(admin: AdminDto): void {
        if (confirm(`Delete admin "${admin.username}"? This cannot be undone.`)) {
            this.adminApi.deleteAdmin(admin.id).subscribe({
                next: () => {
                    this.admins.update((list) => list.filter((a) => a.id !== admin.id));
                },
                error: () => {
                    // Handled by global interceptor
                },
            });
        }
    }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }
}
