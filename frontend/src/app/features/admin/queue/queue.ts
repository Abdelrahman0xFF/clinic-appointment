import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentPeopleQueue, fluentCalendarCheckmark } from '@ng-icons/fluent-ui';
import { forkJoin } from 'rxjs';
import { AppointmentApi } from '../../../core/api/appointment/appointment.service';
import { QueueApi } from '../../../core/api/queue/queue.service';
import { QueueEntryDto } from '../../../core/api/queue/queue.types';
import { QueueKanban } from './sections/kanban';
import { QueueCheckinList } from './sections/checkin-list';
import { QueueCardItem, CheckInCandidate } from './queue.types';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll-animate.directive';

@Component({
    selector: 'app-queue',
    imports: [NgIcon, QueueKanban, QueueCheckinList, ScrollAnimateDirective],
    viewProviders: [
        provideIcons({
            fluentPeopleQueue,
            fluentCalendarCheckmark,
        }),
    ],
    template: `
        <div>
            <div appScrollAnimate animateDirection="fade" class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-2xl lg:text-3xl font-bold text-slate-900">Queue</h1>
                    <p class="text-slate-500 mt-1">
                        Patient flow - waiting, in consultation, and completed
                    </p>
                </div>
            </div>

            <div class="flex gap-2 mb-8 flex-wrap">
                @for (tab of viewTabs; track tab.key; let i = $index) {
                    <button
                        appScrollAnimate animateDirection="right" animateDelay="{{ i * 50 }}ms"
                        type="button"
                        (click)="selectedView = tab.key"
                        [class]="
                            'px-4 py-2 rounded-lg font-medium text-sm transition cursor-pointer inline-flex items-center gap-1.5 ' +
                            (selectedView === tab.key
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900')
                        "
                    >
                        <ng-icon [name]="tab.icon" size="16" />
                        {{ tab.label }}
                    </button>
                }
            </div>

            @if (loading()) {
                <div class="flex items-center justify-center py-20">
                    <span class="text-slate-500">Loading queue...</span>
                </div>
            } @else if (selectedView === 'queue') {
                <app-queue-kanban
                    [waitingEntries]="waitingCards()"
                    [consultationEntries]="consultationCards()"
                    [completedEntries]="completedCards()"
                    (moveToConsultation)="moveToConsultation($event)"
                    (moveToCompleted)="moveToCompleted($event)"
                />
            } @else if (selectedView === 'checkin') {
                <app-queue-checkin-list
                    [candidates]="checkInCandidates()"
                    (checkIn)="checkInFromAppointment($event)"
                />
            }
        </div>
    `,
})
export class Queue implements OnInit {
    private appointmentApi = inject(AppointmentApi);
    private queueApi = inject(QueueApi);

    selectedView: 'queue' | 'checkin' = 'queue';

    viewTabs = [
        { key: 'queue' as const, label: 'Live Queue', icon: 'fluentPeopleQueue' },
        { key: 'checkin' as const, label: 'Check In', icon: 'fluentCalendarCheckmark' },
    ];

    loading = signal(true);
    queueEntries = signal<QueueEntryDto[]>([]);
    todayAppointments = signal<CheckInCandidate[]>([]);

    waitingCards = computed<QueueCardItem[]>(() =>
        this.queueEntries()
            .filter((e) => e.stage === 'waiting')
            .map((e) => ({
                id: e.id,
                patientName: e.appointmentId.patientId.fullName,
                time: e.appointmentId.time,
            })),
    );

    consultationCards = computed<QueueCardItem[]>(() =>
        this.queueEntries()
            .filter((e) => e.stage === 'in_consultation')
            .map((e) => ({
                id: e.id,
                patientName: e.appointmentId.patientId.fullName,
                time: e.appointmentId.time,
            })),
    );

    completedCards = computed<QueueCardItem[]>(() =>
        this.queueEntries()
            .filter((e) => e.stage === 'completed')
            .map((e) => ({
                id: e.id,
                patientName: e.appointmentId.patientId.fullName,
                time: e.appointmentId.time,
            })),
    );

    checkInCandidates = computed<CheckInCandidate[]>(() => {
        const queueNames = new Set(
            this.queueEntries().map((e) => e.appointmentId.patientId.fullName),
        );
        return this.todayAppointments().filter((a) => !queueNames.has(a.patientName));
    });

    ngOnInit() {
        this.loadData();
    }

    private loadData() {
        this.loading.set(true);
        const today = new Date().toISOString().split('T')[0];
        forkJoin({
            queue: this.queueApi.getAll({ limit: 100 }),
            appointments: this.appointmentApi.getAll({ date: today, limit: 100 }),
        }).subscribe({
            next: ({ queue, appointments }) => {
                this.queueEntries.set(queue.data);
                this.todayAppointments.set(
                    appointments.data
                        .filter(
                            (a) =>
                                a.status === 'approved' &&
                                !a.checkedIn &&
                                typeof a.patientId !== 'string',
                        )
                        .map((a) => ({
                            id: a.id,
                            patientName: (
                                a.patientId as { id: string; fullName: string; phone: string }
                            ).fullName,
                            time: a.time,
                            phone: (a.patientId as { id: string; fullName: string; phone: string })
                                .phone,
                            reason: a.reason,
                        })),
                );
            },
            error: (err) => console.error('Failed to load queue data', err),
            complete: () => this.loading.set(false),
        });
    }

    checkInFromAppointment(apt: CheckInCandidate) {
        this.appointmentApi.checkIn(apt.id).subscribe({
            next: () => {
                this.selectedView = 'queue';
                this.loadData();
            },
            error: (err) => console.error('Failed to check in', err),
        });
    }

    moveToConsultation(entry: QueueCardItem) {
        this.queueApi.updateStage(entry.id, 'in_consultation').subscribe({
            next: () => this.loadData(),
            error: (err) => console.error('Failed to move to consultation', err),
        });
    }

    moveToCompleted(entry: QueueCardItem) {
        this.queueApi.updateStage(entry.id, 'completed').subscribe({
            next: () => this.loadData(),
            error: (err) => console.error('Failed to move to completed', err),
        });
    }
}
