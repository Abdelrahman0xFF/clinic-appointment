import { Component, inject } from '@angular/core';
import { ClinicService } from '../../../../core/clinic';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentWallet } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [provideIcons({ fluentWallet })],
    selector: 'app-settings-payment',
    imports: [NgIcon],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 h-full flex flex-col">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <span class="flex items-center justify-center size-10 rounded-xl bg-blue-100 text-blue-600">
                    <ng-icon name="fluentWallet" size="22" />
                </span>
                <div>
                    <h2 class="text-lg font-bold text-slate-900">Payment Information</h2>
                    <p class="text-sm text-slate-500">Fees, mobile wallet, and payment links</p>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <span class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                        Wallet Number
                    </span>
                    <input
                        type="tel"
                        [value]="clinic.walletNumber"
                        class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 font-mono placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                </div>
                <div>
                    <span class="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                        Instapay Link
                    </span>
                    <input
                        type="url"
                        [value]="clinic.instapayLink"
                        class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    `,
})
export class SettingsPayment {
    clinic = inject(ClinicService);
}
