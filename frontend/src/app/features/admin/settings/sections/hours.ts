import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentClock, fluentDismiss } from '@ng-icons/fluent-ui';
import { DAY_LABELS } from '../../../../core/layout/layout.types';

@Component({
    viewProviders: [provideIcons({ fluentClock, fluentDismiss })],
    selector: 'app-settings-hours',
    imports: [NgIcon],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 h-full flex flex-col">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <span
                    class="flex items-center justify-center size-10 rounded-xl bg-indigo-100 text-indigo-600"
                >
                    <ng-icon name="fluentClock" size="22" />
                </span>
                <div>
                    <h2 class="text-lg font-bold text-slate-900">Working Hours</h2>
                    <p class="text-sm text-slate-500">Daily clinic operation schedule</p>
                </div>
            </div>

            <div class="space-y-2">
                @for (day of workingDays; track day.key) {
                    <div
                        class="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 rounded-lg border border-slate-100 bg-slate-50/50 gap-3"
                    >
                        <span class="text-sm font-medium text-slate-900 sm:w-24 shrink-0">{{
                            day.label
                        }}</span>
                        @if (day.hours) {
                            <div class="flex flex-wrap sm:flex-nowrap items-center gap-2">
                                <input
                                    type="time"
                                    [value]="day.hours.start"
                                    (input)="
                                        updateHours(day.key, 'start', $any($event.target).value)
                                    "
                                    class="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-700 font-mono focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all flex-1 sm:flex-none sm:w-28 min-w-[100px]"
                                />
                                <span class="text-slate-400 text-xs font-medium">to</span>
                                <input
                                    type="time"
                                    [value]="day.hours.end"
                                    (input)="updateHours(day.key, 'end', $any($event.target).value)"
                                    class="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-700 font-mono focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all flex-1 sm:flex-none sm:w-28 min-w-[100px]"
                                />
                                <button
                                    type="button"
                                    (click)="clearHours(day.key)"
                                    class="size-7 flex items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition cursor-pointer"
                                    title="Close day"
                                >
                                    <ng-icon name="fluentDismiss" size="14" />
                                </button>
                            </div>
                        } @else {
                            <div class="flex items-center gap-2">
                                <span
                                    class="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full"
                                    >Closed</span
                                >
                                <button
                                    type="button"
                                    (click)="setDefaultHours(day.key)"
                                    class="text-xs text-blue-600 hover:text-blue-700 font-medium transition cursor-pointer"
                                >
                                    Set hours
                                </button>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    `,
})
export class SettingsHours {
    @Input() workingHours: Record<string, { start: string; end: string } | null> = {};
    @Output() workingHoursChange = new EventEmitter<
        Record<string, { start: string; end: string } | null>
    >();

    dayOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    get workingDays() {
        return this.dayOrder
            .filter((key) => this.workingHours[key] !== undefined)
            .map((key) => ({
                key,
                label: DAY_LABELS[key] || key,
                hours: this.workingHours[key],
            }));
    }

    updateHours(day: string, field: 'start' | 'end', value: string) {
        const current = this.workingHours[day];
        if (!current) return;
        const updated = { ...this.workingHours };
        updated[day] = { ...current, [field]: value };
        this.workingHoursChange.emit(updated);
    }

    setDefaultHours(day: string) {
        const updated = { ...this.workingHours };
        updated[day] = { start: '09:00', end: '17:00' };
        this.workingHoursChange.emit(updated);
    }

    clearHours(day: string) {
        const updated = { ...this.workingHours };
        updated[day] = null;
        this.workingHoursChange.emit(updated);
    }
}
