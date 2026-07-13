import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicService } from '../../core/clinic';
import { UiButton } from '../../shared/ui/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentAlert,
    fluentCheckmarkCircle,
    fluentDocumentBulletList,
    fluentArrowTrending,
    fluentClock,
    fluentArrowRight,
} from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [
        provideIcons({
            fluentAlert,
            fluentCheckmarkCircle,
            fluentDocumentBulletList,
            fluentArrowTrending,
            fluentClock,
            fluentArrowRight,
        }),
    ],
    selector: 'app-dashboard',
    imports: [RouterLink, UiButton, NgIcon],
    template: `
        <div>
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl lg:text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p class="text-slate-500 mt-1">Overview of your clinic today</p>
                </div>
                <div class="flex items-center gap-2 text-sm text-slate-400">
                    <ng-icon name="fluentClock" size="16" />
                    <span>{{ todayDate }}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <div
                    class="group relative overflow-hidden rounded-xl border border-amber-200 bg-amber-50 p-5 lg:p-6 transition-all duration-200 hover:shadow-lg hover:shadow-amber-200/40 hover:-translate-y-0.5"
                >
                    <div
                        class="absolute top-0 right-0 w-24 h-24 bg-amber-100/50 rounded-full -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150"
                    ></div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold text-amber-900 text-sm">Pending Requests</h3>
                            <span
                                class="flex items-center justify-center size-9 rounded-lg bg-amber-100 text-amber-600"
                            >
                                <ng-icon name="fluentAlert" size="20" />
                            </span>
                        </div>
                        <p class="text-3xl font-bold text-amber-600 mb-0.5">
                            {{ pendingCount }}
                        </p>
                        <p class="text-sm text-amber-700">Awaiting review</p>
                    </div>
                </div>

                <div
                    class="group relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50 p-5 lg:p-6 transition-all duration-200 hover:shadow-lg hover:shadow-blue-200/40 hover:-translate-y-0.5"
                >
                    <div
                        class="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-full -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150"
                    ></div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold text-blue-900 text-sm">
                                Today's Appointments
                            </h3>
                            <span
                                class="flex items-center justify-center size-9 rounded-lg bg-blue-100 text-blue-600"
                            >
                                <ng-icon name="fluentCheckmarkCircle" size="20" />
                            </span>
                        </div>
                        <p class="text-3xl font-bold text-blue-600 mb-0.5">
                            {{ todayAppointments }}
                        </p>
                        <p class="text-sm text-blue-700">Approved and ready</p>
                    </div>
                </div>

                <div
                    class="group relative overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50 p-5 lg:p-6 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200/40 hover:-translate-y-0.5"
                >
                    <div
                        class="absolute top-0 right-0 w-24 h-24 bg-indigo-100/50 rounded-full -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150"
                    ></div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold text-indigo-900 text-sm">In Queue Now</h3>
                            <span
                                class="flex items-center justify-center size-9 rounded-lg bg-indigo-100 text-indigo-600"
                            >
                                <ng-icon name="fluentDocumentBulletList" size="20" />
                            </span>
                        </div>
                        <p class="text-3xl font-bold text-indigo-600 mb-0.5">
                            {{ inQueueCount }}
                        </p>
                        <p class="text-sm text-indigo-700">Active queue entries</p>
                    </div>
                </div>

                <div
                    class="group relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 p-5 lg:p-6 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200/40 hover:-translate-y-0.5"
                >
                    <div
                        class="absolute top-0 right-0 w-24 h-24 bg-emerald-100/50 rounded-full -translate-y-8 translate-x-8 transition-transform duration-300 group-hover:scale-150"
                    ></div>
                    <div class="relative">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold text-emerald-900 text-sm">Completed Today</h3>
                            <span
                                class="flex items-center justify-center size-9 rounded-lg bg-emerald-100 text-emerald-600"
                            >
                                <ng-icon name="fluentArrowTrending" size="20" />
                            </span>
                        </div>
                        <p class="text-3xl font-bold text-emerald-600 mb-0.5">
                            {{ completedToday }}
                        </p>
                        <p class="text-sm text-emerald-700">Patient consultations</p>
                    </div>
                </div>
            </div>

            @if (recentPending.length > 0) {
                <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div
                        class="flex items-center justify-between px-6 py-5 border-b border-slate-100"
                    >
                        <div>
                            <h2 class="text-lg font-bold text-slate-900">
                                Recent Pending Requests
                            </h2>
                            <p class="text-sm text-slate-500 mt-0.5">
                                {{ pendingCount }} request{{ pendingCount === 1 ? '' : 's' }} need
                                your attention
                            </p>
                        </div>
                        <a routerLink="/admin/appointments">
                            <app-button variant="ghost" size="sm">View All</app-button>
                        </a>
                    </div>

                    <div class="divide-y divide-slate-100">
                        @for (apt of recentPending; track apt.id) {
                            <div
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
                                    <button
                                        type="button"
                                        class="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                                        title="Review"
                                    >
                                        <ng-icon name="fluentArrowRight" size="18" />
                                    </button>
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
                <div
                    class="rounded-xl border border-slate-200 p-12 lg:p-16 text-center bg-white"
                >
                    <div
                        class="size-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5"
                    >
                        <ng-icon name="fluentCheckmarkCircle" size="32" class="text-emerald-600" />
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
        </div>
    `,
})
export class Dashboard {
    private clinic = inject(ClinicService);

    appointments = this.clinic.appointments;
    queueEntries = this.clinic.queueEntries;
    todayDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    get pendingCount() {
        return this.appointments.filter((a) => a.status === 'pending').length;
    }

    get todayAppointments() {
        const today = new Date().toISOString().split('T')[0];
        return this.appointments.filter((a) => a.date === today && a.status === 'approved').length;
    }

    get inQueueCount() {
        return this.queueEntries.filter((q) => q.stage !== 'completed').length;
    }

    get completedToday() {
        return this.queueEntries.filter((q) => q.stage === 'completed').length;
    }

    get recentPending() {
        return this.appointments.filter((a) => a.status === 'pending').slice(0, 3);
    }
}
