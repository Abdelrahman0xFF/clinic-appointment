import { Component, inject } from '@angular/core';
import { ClinicService } from '../../../core/clinic';
import { DashboardStats } from './sections/stats';
import { DashboardPending } from './sections/pending';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentClock } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [provideIcons({ fluentClock })],
    selector: 'app-dashboard',
    imports: [NgIcon, DashboardStats, DashboardPending],
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

            <app-dashboard-stats
                [pendingCount]="pendingCount"
                [todayAppointments]="todayAppointments"
                [inQueueCount]="inQueueCount"
                [completedToday]="completedToday"
            />

            <app-dashboard-pending
                [pendingCount]="pendingCount"
                [recentPending]="recentPending"
            />
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
