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
            class="group relative p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
        >
            <div
                class="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-500/5 to-blue-500/5 rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div
                class="relative flex items-center justify-center size-14 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 mb-5 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-200/50 transition-all duration-300"
            >
                <ng-icon name="{{ icon }}" size="26" />
            </div>
            <h3
                class="font-semibold text-slate-900 mb-2 text-lg group-hover:text-blue-600 transition-colors"
            >
                {{ title }}
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ description }}</p>
            <div
                class="mt-4 h-px bg-linear-to-r from-blue-100 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            ></div>
        </div>
    `,
})
export class ServiceCard {
    @Input() title!: string;
    @Input() description!: string;
    @Input() icon!: string;
}
