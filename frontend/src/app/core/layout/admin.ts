import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentGrid,
    fluentCalendarCheckmark,
    fluentPeopleQueue,
    fluentNews,
    fluentSettings,
    fluentPerson,
    fluentArrowExit,
} from '@ng-icons/fluent-ui';
import { AuthService } from '../auth/auth.service';

@Component({
    viewProviders: [
        provideIcons({
            fluentGrid,
            fluentCalendarCheckmark,
            fluentPeopleQueue,
            fluentNews,
            fluentSettings,
            fluentPerson,
            fluentArrowExit,
        }),
    ],
    selector: 'app-layout-admin',
    imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIcon],
    template: `
        <div class="h-screen bg-slate-50 flex overflow-hidden">
            <aside class="flex flex-col w-64 bg-white border-r border-slate-200 shrink-0">
                <div class="p-6 border-b border-slate-200">
                    <a routerLink="/" class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"
                        >
                            <span class="text-white font-bold text-lg">MC</span>
                        </div>
                        <div>
                            <h2 class="font-bold text-slate-900 leading-tight">MediCare</h2>
                            <p class="text-[11px] text-slate-500 leading-tight">Admin Panel</p>
                        </div>
                    </a>
                </div>

                <nav class="flex-1 overflow-y-auto p-3 space-y-1">
                    @for (navLink of navLinks; track navLink.label) {
                        <a
                            [routerLink]="navLink.href"
                            routerLinkActive="bg-blue-50 text-blue-700 shadow-sm"
                            [routerLinkActiveOptions]="{ exact: false }"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        >
                            <span
                                class="flex items-center justify-center size-8 rounded-lg transition-colors duration-150 text-slate-400 group-hover:text-slate-600"
                            >
                                <ng-icon [name]="navLink.icon" size="20" />
                            </span>
                            {{ navLink.label }}
                        </a>
                    }
                </nav>

                <div class="p-3 border-t border-slate-200">
                    <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 mb-2">
                        <div
                            class="size-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0"
                        >
                            <span class="text-blue-600 font-bold text-sm">{{ adminInitial }}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-slate-900 text-sm truncate leading-tight">
                                {{ adminName }}
                            </p>
                            <p class="text-[11px] text-slate-500 truncate leading-tight">
                                Administrator
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        (click)="handleLogout()"
                        class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 cursor-pointer"
                    >
                        <ng-icon name="fluentArrowExit" size="20" />
                        Logout
                    </button>
                </div>
            </aside>

            <main class="flex-1 overflow-auto p-6 lg:p-8">
                <router-outlet />
            </main>
        </div>
    `,
})
export class LayoutAdmin {
    private auth = inject(AuthService);
    private router = inject(Router);

    navLinks = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: 'fluentGrid' },
        { href: '/admin/appointments', label: 'Appointments', icon: 'fluentCalendarCheckmark' },
        { href: '/admin/queue', label: 'Queue', icon: 'fluentPeopleQueue' },
        { href: '/admin/admins', label: 'Admins', icon: 'fluentPerson' },
        { href: '/admin/blog', label: 'Blog', icon: 'fluentNews' },
        { href: '/admin/settings', label: 'Settings', icon: 'fluentSettings' },
    ];

    get adminName(): string {
        return this.auth.admin()?.username || 'Admin';
    }

    get adminInitial(): string {
        const name = this.adminName;
        return name.charAt(0).toUpperCase();
    }

    handleLogout(): void {
        this.auth.logout();
    }
}
