import { Component, inject } from '@angular/core';
import { ClinicService } from '../../../core/clinic';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentBuilding } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [provideIcons({ fluentBuilding })],
    selector: 'app-settings-general',
    imports: [NgIcon],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 h-full flex flex-col">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <span
                    class="flex items-center justify-center size-10 rounded-xl bg-blue-100 text-blue-600"
                >
                    <ng-icon name="fluentBuilding" size="22" />
                </span>
                <div>
                    <h2 class="text-lg font-bold text-slate-900">General Information</h2>
                    <p class="text-sm text-slate-500">Basic clinic details and specialization</p>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <span
                        class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider"
                    >
                        Clinic Name
                    </span>
                    <input
                        type="text"
                        [value]="clinic.name"
                        class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                </div>
                <div>
                    <span
                        class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider"
                    >
                        Specialization
                    </span>
                    <input
                        type="text"
                        [value]="clinic.specialization"
                        class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                </div>
                <div class="sm:col-span-2">
                    <span
                        class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider"
                    >
                        Address
                    </span>
                    <textarea
                        rows="2"
                        [value]="clinic.address"
                        class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    ></textarea>
                </div>
                <div>
                    <span
                        class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider"
                    >
                        Phone Number
                    </span>
                    <input
                        type="tel"
                        [value]="clinic.phone"
                        class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 font-mono placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                </div>
                <div>
                    <span
                        class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider"
                    >
                        Consultation Fee
                    </span>
                    <div class="relative">
                        <input
                            type="number"
                            [value]="clinic.consultationFee"
                            class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                        <span
                            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium"
                        >
                            EGP
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class SettingsGeneral {
    clinic = inject(ClinicService);
}
