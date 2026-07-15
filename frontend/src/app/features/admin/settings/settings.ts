import { Component, OnInit, inject, signal } from '@angular/core';
import { ClinicService } from '../../../core/api/clinic/clinic.service';
import { SettingsGeneral } from './sections/general';
import { SettingsHours } from './sections/hours';
import { SettingsSocial } from './sections/social';
import { SettingsCredentials } from './sections/credentials';
import { SettingsPayment } from './sections/payment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentSave } from '@ng-icons/fluent-ui';
import { UiButton } from '../../../shared/ui/button';

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
                <app-button [loading]="saving()" class="p-5" (click)="handleSave()">
                    <ng-icon name="fluentSave" size="18" />
                    Save Changes
                </app-button>
            </div>

            @if (loading()) {
                <div class="flex items-center justify-center py-16">
                    <span
                        class="size-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"
                    ></span>
                </div>
            } @else {
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <app-settings-general
                        class="col-span-2"
                        [name]="name"
                        [specialization]="specialization"
                        [address]="address"
                        [phone]="phone"
                        [consultationFee]="consultationFee"
                        (nameChange)="name = $event"
                        (specializationChange)="specialization = $event"
                        (addressChange)="address = $event"
                        (phoneChange)="phone = $event"
                        (consultationFeeChange)="consultationFee = $event"
                    />
                    <app-settings-social
                        [socialMedia]="socialMedia"
                        (socialMediaChange)="socialMedia = $event"
                    />
                    <app-settings-hours
                        class="col-span-2 row-span-2"
                        [workingHours]="workingHours"
                        (workingHoursChange)="workingHours = $event"
                    />
                    <app-settings-credentials
                        [credentials]="credentials"
                        (credentialsChange)="credentials = $event"
                    />
                    <app-settings-payment
                        [walletNumber]="walletNumber"
                        [instapayLink]="instapayLink"
                        (walletNumberChange)="walletNumber = $event"
                        (instapayLinkChange)="instapayLink = $event"
                    />
                </div>
            }

            @if (error()) {
                <div
                    class="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600"
                >
                    {{ error() }}
                </div>
            }
        </div>
    `,
})
export class Settings implements OnInit {
    private clinicService = inject(ClinicService);

    loading = signal(true);
    saving = signal(false);
    error = signal('');

    name = '';
    specialization = '';
    address = '';
    phone = '';
    consultationFee = 0;
    walletNumber = '';
    instapayLink = '';
    socialMedia: Record<string, { link: string } | null> = {};
    workingHours: Record<string, { start: string; end: string } | null> = {};
    credentials: string[] = [];

    ngOnInit() {
        this.clinicService.fetchInfo().subscribe({
            next: (data) => {
                this.name = data.name;
                this.specialization = data.specialization;
                this.address = data.address;
                this.phone = data.phone;
                this.consultationFee = data.consultationFee;
                this.walletNumber = data.walletNumber;
                this.instapayLink = data.instapayLink;
                this.socialMedia = { ...data.socialMedia };
                this.workingHours = { ...data.workingHours };
                this.credentials = [...(data.credentials || [])];
                this.clinicService.clinicData.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false),
        });
    }

    handleSave() {
        this.saving.set(true);
        this.error.set('');
        this.clinicService
            .updateInfo({
                name: this.name,
                specialization: this.specialization,
                address: this.address,
                phone: this.phone,
                consultationFee: this.consultationFee,
                walletNumber: this.walletNumber,
                instapayLink: this.instapayLink,
                socialMedia: this.socialMedia,
                workingHours: this.workingHours,
                credentials: this.credentials,
            })
            .subscribe({
                next: (data) => {
                    this.clinicService.clinicData.set(data);
                    this.saving.set(false);
                },
                error: (err) => {
                    this.saving.set(false);
                    this.error.set(err.error?.message || 'Failed to save settings');
                },
            });
    }
}
