import { Component, inject } from '@angular/core';
import { ClinicService } from '../../../core/clinic';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentClock } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [provideIcons({ fluentClock })],
    selector: 'app-settings-hours',
    imports: [NgIcon],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <span class="flex items-center justify-center size-10 rounded-xl bg-indigo-100 text-indigo-600">
                    <ng-icon name="fluentClock" size="22" />
                </span>
                <div>
                    <h2 class="text-lg font-bold text-slate-900">Working Hours</h2>
                    <p class="text-sm text-slate-500">Daily clinic operation schedule</p>
                </div>
            </div>

            <div class="space-y-2">
                @for (day of workingDays; track day.key) {
                    <div class="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 bg-slate-50/50 gap-3">
                        <span class="text-sm font-medium text-slate-900 w-24 shrink-0">
                            {{ day.label }}
                        </span>
                        @if (day.hours) {
                            <div class="flex items-center gap-2">
                                <input
                                    type="time"
                                    [value]="day.hours.start"
                                    class="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-700 font-mono focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all w-28"
                                />
                                <span class="text-slate-300 text-xs">to</span>
                                <input
                                    type="time"
                                    [value]="day.hours.end"
                                    class="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-700 font-mono focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all w-28"
                                />
                            </div>
                        } @else {
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                                    Closed
                                </span>
                                <button type="button" class="text-xs text-blue-600 hover:text-blue-700 font-medium transition cursor-pointer">
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
    clinic = inject(ClinicService);
    dayOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    get workingDays() {
        return this.dayOrder
            .filter((key) => this.clinic.workingHours[key] !== undefined)
            .map((key) => ({
                key,
                label: this.clinic.fullDayLabels[key] || key,
                hours: this.clinic.workingHours[key],
            }));
    }
}
