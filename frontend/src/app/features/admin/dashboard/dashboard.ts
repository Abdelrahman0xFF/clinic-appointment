import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentClock } from '@ng-icons/fluent-ui';
import { AppointmentApi } from '../../../core/api/appointment/appointment.service';
import { AppointmentDto } from '../../../core/api/appointment/appointment.types';
import { QueueApi } from '../../../core/api/queue/queue.service';
import { QueueEntryDto } from '../../../core/api/queue/queue.types';
import { DashboardStats } from './sections/stats';
import { DashboardPending } from './sections/pending';

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

            @if (loading()) {
                <div class="flex items-center justify-center py-16">
                    <span
                        class="size-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"
                    ></span>
                </div>
            } @else {
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
            }
        </div>
    `,
})
export class Dashboard implements OnInit {
    private appointmentApi = inject(AppointmentApi);
    private queueApi = inject(QueueApi);

    appointments = signal<AppointmentDto[]>([]);
    queueEntries = signal<QueueEntryDto[]>([]);
    loading = signal(true);

    todayDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    ngOnInit() {
        this.appointmentApi.getAll({ limit: 100 }).subscribe({
            next: (res) => this.appointments.set(res.data),
            error: () => this.loading.set(false),
        });

        this.queueApi.getAll({ limit: 100 }).subscribe({
            next: (res) => {
                this.queueEntries.set(res.data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false),
        });
    }

    get pendingCount() {
        return this.appointments().filter((a) => a.status === 'pending').length;
    }

    get todayAppointments() {
        const today = new Date().toISOString().split('T')[0];
        return this.appointments().filter((a) => a.date === today && a.status === 'approved')
            .length;
    }

    get inQueueCount() {
        return this.queueEntries().filter((q) => q.stage !== 'completed').length;
    }

    get completedToday() {
        return this.queueEntries().filter((q) => q.stage === 'completed').length;
    }

    get recentPending() {
        return this.appointments()
            .filter((a) => a.status === 'pending')
            .slice(0, 3)
            .map((a) => ({
                id: a.id,
                patientName: typeof a.patientId === 'object' ? a.patientId.fullName : 'Unknown',
                date: a.date,
                time: a.time,
                reason: a.reason || undefined,
            }));
    }
}
