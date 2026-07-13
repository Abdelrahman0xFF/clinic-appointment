import { Component, inject } from '@angular/core';
import { ClinicService } from '../../core/clinic';
import { SettingsGeneral } from './sections/general';
import { SettingsHours } from './sections/hours';
import { SettingsSocial } from './sections/social';
import { SettingsCredentials } from './sections/credentials';
import { SettingsPayment } from './sections/payment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentSave } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [provideIcons({ fluentSave })],
    selector: 'app-settings',
    imports: [NgIcon, SettingsGeneral, SettingsHours, SettingsSocial, SettingsCredentials, SettingsPayment],
    template: `
        <div>
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
                    <p class="text-slate-500 mt-1">Manage your clinic information</p>
                </div>
                <button
                    type="button"
                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-all cursor-pointer shadow-sm shadow-blue-200"
                >
                    <ng-icon name="fluentSave" size="18" />
                    Save Changes
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 space-y-6">
                    <app-settings-general />
                    <app-settings-hours />
                </div>

                <div class="space-y-6">
                    <app-settings-social />
                    <app-settings-credentials />
                    <app-settings-payment />
                </div>
            </div>
        </div>
    `,
})
export class Settings {
    clinic = inject(ClinicService);
}
