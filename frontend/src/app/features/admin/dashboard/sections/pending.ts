import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButton } from '../../../../shared/ui/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentClock, fluentArrowRight, fluentCheckmarkCircle } from '@ng-icons/fluent-ui';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
    viewProviders: [
        provideIcons({
            fluentClock,
            fluentArrowRight,
            fluentCheckmarkCircle,
        }),
    ],
    selector: 'app-dashboard-pending',
    imports: [RouterLink, UiButton, NgIcon, ScrollAnimateDirective],
    template: `
        @if (recentPending.length > 0) {
            <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <div>
                        <h2 class="text-lg font-bold text-slate-900">Recent Pending Requests</h2>
                        <p class="text-sm text-slate-500 mt-0.5">
                            {{ pendingCount }} request{{ pendingCount === 1 ? '' : 's' }} need your
                            attention
                        </p>
                    </div>
                    <a routerLink="/admin/appointments">
                        <app-button variant="ghost" size="sm">View All</app-button>
                    </a>
                </div>

                <div class="divide-y divide-slate-100">
                    @for (apt of recentPending; track apt.id; let i = $index) {
                        <div
                            appScrollAnimate
                            animateDirection="up"
                            animateDelay="{{ i * 50 }}ms"
                            class="flex items-center justify-between px-6 py-4 transition-colors hover:bg-slate-50"
                        >
                            <div class="flex items-center gap-4 min-w-0">
                                <div
                                    class="size-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0"
                                >
                                    <span class="text-amber-700 font-semibold text-sm">
                                        {{ apt.patientName.charAt(0) }}
                                    </span>
                                </div>
                                <div class="min-w-0">
                                    <p class="font-medium text-slate-900 truncate">
                                        {{ apt.patientName }}
                                    </p>
                                    <p class="text-sm text-slate-500 truncate">
                                        {{ apt.date }} at {{ apt.time }}
                                        @if (apt.reason) {
                                            &middot; {{ apt.reason }}
                                        }
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 shrink-0">
                                <span
                                    class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-700"
                                >
                                    <ng-icon name="fluentClock" size="12" />
                                    Pending
                                </span>
                            </div>
                        </div>
                    }
                </div>

                <div class="px-6 py-4 border-t border-slate-100">
                    <a routerLink="/admin/appointments">
                        <app-button variant="ghost" class="w-full justify-center">
                            Review All Requests
                            <ng-icon name="fluentArrowRight" size="16" class="ml-1.5" />
                        </app-button>
                    </a>
                </div>
            </div>
        } @else {
            <div class="rounded-xl border border-slate-200 p-12 lg:p-16 text-center bg-white">
                <div
                    class="size-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5"
                >
                    <ng-icon name="fluentCheckmarkCircle" size="32" class="text-blue-600" />
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">All Caught Up!</h3>
                <p class="text-slate-500 mb-8 max-w-sm mx-auto">
                    No pending appointment requests at the moment. New requests will appear here
                    when patients book appointments.
                </p>
                <a routerLink="/admin/appointments">
                    <app-button>View Appointments</app-button>
                </a>
            </div>
        }
    `,
})
export class DashboardPending {
    @Input() pendingCount = 0;
    @Input() recentPending: {
        id: string;
        patientName: string;
        date: string;
        time: string;
        reason?: string;
    }[] = [];
}
