import { Component, inject } from '@angular/core';
import { ClinicService } from '../../core/clinic';
import { SettingsGeneral } from './sections/general';
import { SettingsHours } from './sections/hours';
import { SettingsSocial } from './sections/social';
import { SettingsCredentials } from './sections/credentials';
import { SettingsPayment } from './sections/payment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentSave } from '@ng-icons/fluent-ui';
import { UiButton } from '../../shared/ui/button';

@Component({
    viewProviders: [provideIcons({ fluentSave })],
    selector: 'app-settings',
    imports: [
        NgIcon,
        SettingsGeneral,
        SettingsHours,
        SettingsSocial,
        SettingsCredentials,
        SettingsPayment,
        UiButton,
    ],
    template: `
        <div>
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
                    <p class="text-slate-500 mt-1">Manage your clinic information</p>
                </div>
                <app-button class="p-5">
                    <ng-icon name="fluentSave" size="18" />
                    Save Changes
                </app-button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <app-settings-general class="col-span-2" />
                <app-settings-social />
                <app-settings-hours class="col-span-2 row-span-2" />
                <app-settings-credentials />
                <app-settings-payment class="" />
            </div>
        </div>
    `,
})
export class Settings {
    clinic = inject(ClinicService);
}
