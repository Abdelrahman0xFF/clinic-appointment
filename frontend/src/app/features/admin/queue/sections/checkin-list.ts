import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentClock,
    fluentArrowRight,
    fluentPhone,
    fluentCalendarCheckmark,
} from '@ng-icons/fluent-ui';
import { CheckInCandidate } from '../queue.types';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
    selector: 'app-queue-checkin-list',
    imports: [NgIcon, ScrollAnimateDirective],
    viewProviders: [
        provideIcons({
            fluentClock,
            fluentArrowRight,
            fluentPhone,
            fluentCalendarCheckmark,
        }),
    ],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 class="font-semibold text-slate-900">Approved Appointments</h3>
                <p class="text-sm text-slate-500 mt-0.5">Select a patient to check in and add to the waiting queue</p>
            </div>
            <div class="divide-y divide-slate-100">
                @if (candidates.length > 0) {
                    @for (apt of candidates; track apt.id; let i = $index) {
                        <div appScrollAnimate animateDirection="fade" animateDelay="{{ i * 50 }}ms" class="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition">
                            <div class="size-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <span class="text-blue-700 font-semibold text-sm">{{ apt.patientName.charAt(0) }}</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-medium text-slate-900 text-sm">{{ apt.patientName }}</p>
                                <div class="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
                                    <span class="inline-flex items-center gap-1">
                                        <ng-icon name="fluentClock" size="13" class="shrink-0" />
                                        {{ apt.time }}
                                    </span>
                                    <span class="inline-flex items-center gap-1">
                                        <ng-icon name="fluentPhone" size="13" class="shrink-0" />
                                        {{ apt.phone }}
                                    </span>
                                    <span class="text-slate-400 truncate hidden sm:inline">{{ apt.reason }}</span>
                                </div>
                            </div>
                            <button type="button" (click)="checkIn.emit(apt)"
                                    class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition cursor-pointer shrink-0 whitespace-nowrap">
                                <ng-icon name="fluentArrowRight" size="16" />
                                Check In
                            </button>
                        </div>
                    }
                } @else {
                    <div class="flex flex-col items-center justify-center py-16 text-center">
                        <span class="size-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <ng-icon name="fluentCalendarCheckmark" size="24" class="text-slate-400" />
                        </span>
                        <h3 class="text-slate-900 font-semibold mb-1">No approved appointments</h3>
                        <p class="text-slate-500 text-sm max-w-sm">
                            Approve appointments from the Appointments page to make them available for check-in.
                        </p>
                    </div>
                }
            </div>
        </div>
    `,
})
export class QueueCheckinList {
    @Input() candidates: CheckInCandidate[] = [];
    @Output() checkIn = new EventEmitter<CheckInCandidate>();
}
