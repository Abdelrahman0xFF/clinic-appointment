import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentAdd,
    fluentPeopleQueue,
    fluentCalendarCheckmark,
} from '@ng-icons/fluent-ui';
import { ClinicService, QueueEntry, Appointment } from '../../core/clinic';
import { UiButton } from '../../shared/ui/button';
import { QueueKanban } from './sections/kanban';
import { QueueCheckinList } from './sections/checkin-list';
import { QueueCheckinDialog } from './sections/checkin-dialog';

@Component({
    selector: 'app-queue',
    imports: [NgIcon, UiButton, QueueKanban, QueueCheckinList, QueueCheckinDialog],
    viewProviders: [
        provideIcons({
            fluentAdd,
            fluentPeopleQueue,
            fluentCalendarCheckmark,
        }),
    ],
    template: `
        <div>
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-2xl lg:text-3xl font-bold text-slate-900">Queue</h1>
                    <p class="text-slate-500 mt-1">Patient flow - waiting, in consultation, and completed</p>
                </div>
                <app-button (click)="openCheckInDialog()">
                    <ng-icon name="fluentAdd" size="20" />
                    Check In
                </app-button>
            </div>

            <div class="flex gap-2 mb-8 flex-wrap">
                @for (tab of viewTabs; track tab.key) {
                    <button type="button" (click)="selectedView = tab.key"
                            [class]="'px-4 py-2 rounded-lg font-medium text-sm transition cursor-pointer inline-flex items-center gap-1.5 ' + (selectedView === tab.key ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900')">
                        <ng-icon [name]="tab.icon" size="16" />
                        {{ tab.label }}
                    </button>
                }
            </div>

            @if (selectedView === 'queue') {
                <app-queue-kanban
                    [waitingEntries]="waitingEntries"
                    [consultationEntries]="consultationEntries"
                    [completedEntries]="completedEntries"
                    (moveToConsultation)="moveToConsultation($event)"
                    (moveToCompleted)="moveToCompleted($event)"
                />
            }

            @if (selectedView === 'checkin') {
                <app-queue-checkin-list
                    [candidates]="checkInCandidates"
                    (checkIn)="checkInFromAppointment($event)"
                />
            }
        </div>

        <app-queue-checkin-dialog
            [open]="checkInDialogOpen"
            (save)="confirmCheckIn($event)"
            (dismiss)="closeCheckInDialog()"
        />
    `,
})
export class Queue {
    private service = inject(ClinicService);

    selectedView: 'queue' | 'checkin' = 'queue';
    checkInDialogOpen = false;

    viewTabs = [
        { key: 'queue' as const, label: 'Live Queue', icon: 'fluentPeopleQueue' },
        { key: 'checkin' as const, label: 'Check In', icon: 'fluentCalendarCheckmark' },
    ];

    get queueEntries() {
        return this.service.queueEntries;
    }

    get appointments() {
        return this.service.appointments;
    }

    get waitingEntries() {
        return this.queueEntries.filter((q) => q.stage === 'waiting');
    }

    get consultationEntries() {
        return this.queueEntries.filter((q) => q.stage === 'in_consultation');
    }

    get completedEntries() {
        return this.queueEntries.filter((q) => q.stage === 'completed');
    }

    get checkInCandidates() {
        const today = new Date().toISOString().split('T')[0];
        const queueNames = new Set(this.queueEntries.map((q) => q.patientName));
        return this.appointments.filter(
            (a) => a.status === 'approved' && a.date === today && !queueNames.has(a.patientName),
        );
    }

    openCheckInDialog() {
        this.checkInDialogOpen = true;
    }

    closeCheckInDialog() {
        this.checkInDialogOpen = false;
    }

    confirmCheckIn(name: string) {
        if (!name) return;
        this.service.checkInAppointment(name);
        this.selectedView = 'queue';
        this.closeCheckInDialog();
    }

    checkInFromAppointment(apt: Appointment) {
        this.service.checkInAppointment(apt.patientName);
        this.selectedView = 'queue';
    }

    moveToConsultation(entry: QueueEntry) {
        this.service.updateQueueStage(entry.id, 'in_consultation');
    }

    moveToCompleted(entry: QueueEntry) {
        this.service.updateQueueStage(entry.id, 'completed');
    }
}
