import { Component, inject } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { ClinicService } from '../../../../core/clinic';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentGlobe, fluentDismiss } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [provideIcons({ fluentGlobe, fluentDismiss })],
    selector: 'app-settings-social',
    imports: [NgIcon, KeyValuePipe],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 h-full flex flex-col">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <span class="flex items-center justify-center size-10 rounded-xl bg-amber-100 text-amber-600">
                    <ng-icon name="fluentGlobe" size="22" />
                </span>
                <div>
                    <h2 class="text-lg font-bold text-slate-900">Social Media</h2>
                    <p class="text-sm text-slate-500">Online presence links</p>
                </div>
            </div>

            <div class="space-y-3">
                @for (item of clinic.socialMedia | keyvalue; track item.key) {
                    <div>
                        <span class="block text-xs font-medium text-slate-400 mb-1.5 capitalize">
                            {{ item.key }}
                        </span>
                        <div class="relative">
                            <input
                                type="url"
                                [value]="item.value?.link || ''"
                                placeholder="https://..."
                                class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                            @if (item.value?.link) {
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 size-5 rounded-full bg-blue-100 flex items-center justify-center">
                                    <ng-icon name="fluentDismiss" size="10" class="text-blue-600" />
                                </span>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    `,
})
export class SettingsSocial {
    clinic = inject(ClinicService);
}
