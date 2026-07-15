import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentCalendarClock } from '@ng-icons/fluent-ui';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
    viewProviders: [provideIcons({ fluentCalendarClock })],
    selector: 'app-appointments-toolbar',
    imports: [NgIcon, ScrollAnimateDirective],
    template: `
        <div
            appScrollAnimate
            animateDirection="fade"
            class="flex items-center justify-between mb-6"
        >
            <div>
                <h1 class="text-2xl lg:text-3xl font-bold text-slate-900">Appointments</h1>
                <p class="text-slate-500 mt-1">Manage patient appointment requests</p>
            </div>
            <ng-icon name="fluentCalendarClock" size="24" class="text-slate-300" />
        </div>

        <div class="flex gap-2 mb-8 flex-wrap">
            @for (tab of filterTabs; track tab.key; let i = $index) {
                <button
                    appScrollAnimate
                    animateDirection="right"
                    animateDelay="{{ i * 50 }}ms"
                    type="button"
                    (click)="filterChange.emit(tab.key)"
                    [class]="
                        'px-4 py-2 rounded-lg font-medium text-sm transition cursor-pointer capitalize ' +
                        (selectedFilter === tab.key
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900')
                    "
                >
                    {{ tab.label }}
                    @if (tab.count > 0) {
                        <span
                            [class]="
                                'ml-1.5 px-1.5 py-0.5 rounded-full text-xs ' +
                                (selectedFilter === tab.key
                                    ? 'bg-white/20'
                                    : 'bg-slate-200 text-slate-600')
                            "
                        >
                            {{ tab.count }}
                        </span>
                    }
                </button>
            }
        </div>
    `,
})
export class AppointmentsToolbar {
    @Input() filterTabs: { key: string; label: string; count: number }[] = [];
    @Input() selectedFilter = 'all';
    @Output() filterChange = new EventEmitter<string>();
}
