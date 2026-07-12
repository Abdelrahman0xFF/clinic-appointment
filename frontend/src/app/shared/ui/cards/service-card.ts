import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentStethoscope,
    fluentHeartPulse,
    fluentSyringe,
    fluentClipboardTaskListLtr,
    fluentPeople,
    fluentPulse,
} from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [
        provideIcons({
            fluentStethoscope,
            fluentHeartPulse,
            fluentSyringe,
            fluentClipboardTaskListLtr,
            fluentPeople,
            fluentPulse,
        }),
    ],
    standalone: true,
    selector: 'app-service-card',
    imports: [NgIcon],
    template: `
        <div
            class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm group hover:shadow-md *:transition-all duration-200 hover:scale-[1.05]"
        >
            <div
                class="w-12 h-12 bg-blue-100 border-3 border-blue-200 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:border-3 group-hover:shadow-md transform group-hover:scale-110 transition-all duration-200"
            >
                <ng-icon name="{{ icon }}" size="24" />
            </div>
            <h3 class="font-semibold text-slate-900 mb-2">{{ title }}</h3>
            <p class="text-slate-600 text-sm">{{ description }}</p>
        </div>
    `,
})
export class ServiceCard {
    @Input() title!: string;
    @Input() description!: string;
    @Input() icon!: string;
}
