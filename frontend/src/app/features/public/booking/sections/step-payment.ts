import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentAlert,
    fluentCheckmarkCircle,
    fluentCopy,
    fluentCheckmark,
    fluentCloudAdd,
    fluentDismiss,
} from '@ng-icons/fluent-ui';
import { UiButton } from '../../../../shared/ui/button';

@Component({
    selector: 'app-booking-step-payment',
    imports: [NgIcon, UiButton],
    viewProviders: [
        provideIcons({
            fluentAlert,
            fluentCheckmarkCircle,
            fluentCopy,
            fluentCheckmark,
            fluentCloudAdd,
            fluentDismiss,
        }),
    ],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">Payment Verification</h2>

            <div class="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8">
                <div class="flex gap-3">
                    <ng-icon name="fluentAlert" size="20" class="text-amber-600 shrink-0 mt-0.5" />
                    <div class="space-y-3">
                        <p class="font-semibold text-slate-900">
                            Please transfer the consultation fee:
                        </p>
                        <div>
                            <p class="text-sm font-medium text-slate-700 mb-1">InstaPay:</p>
                            <div
                                class="flex items-center gap-2 bg-white px-3 py-2 rounded border border-amber-200"
                            >
                                <code class="text-sm font-mono text-slate-900 flex-1 truncate">{{
                                    instapayLink
                                }}</code>
                                <button
                                    type="button"
                                    (click)="copyText(instapayLink, 'instapay')"
                                    class="text-amber-600 hover:text-amber-700 transition cursor-pointer shrink-0"
                                >
                                    <ng-icon
                                        [name]="
                                            copiedKey === 'instapay'
                                                ? 'fluentCheckmark'
                                                : 'fluentCopy'
                                        "
                                        size="16"
                                    />
                                </button>
                            </div>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-slate-700 mb-1">Wallet Number:</p>
                            <div
                                class="flex items-center gap-2 bg-white px-3 py-2 rounded border border-amber-200"
                            >
                                <code class="text-sm font-mono text-slate-900 flex-1 truncate">{{
                                    walletNumber
                                }}</code>
                                <button
                                    type="button"
                                    (click)="copyText(walletNumber, 'wallet')"
                                    class="text-amber-600 hover:text-amber-700 transition cursor-pointer shrink-0"
                                >
                                    <ng-icon
                                        [name]="
                                            copiedKey === 'wallet'
                                                ? 'fluentCheckmark'
                                                : 'fluentCopy'
                                        "
                                        size="16"
                                    />
                                </button>
                            </div>
                        </div>
                        <p class="text-sm text-slate-600">
                            <strong>Fee:</strong> {{ consultationFee }} EGP
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <span class="block text-sm font-semibold text-slate-900 mb-3"
                    >Upload Payment Screenshot *</span
                >
                @if (!receiptFileName) {
                    <div
                        tabindex="0"
                        role="button"
                        [class]="
                            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors outline-none focus:ring-2 ' +
                            (showErrors && !receiptFileName
                                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                                : 'border-slate-300 hover:border-blue-500 focus:border-blue-400 focus:ring-blue-100')
                        "
                        (click)="fileInput.click()"
                        (keydown.enter)="fileInput.click()"
                        (keydown.space)="fileInput.click(); $event.preventDefault()"
                    >
                        @if (showErrors && !receiptFileName) {
                            <p class="text-xs text-red-500 mb-2">Payment screenshot is required</p>
                        }
                        <ng-icon name="fluentCloudAdd" size="32" class="text-slate-400 mb-3" />
                        <p class="font-medium text-slate-900 mb-1">Upload Payment Screenshot</p>
                        <p class="text-sm text-slate-500">PNG or JPG, max 5MB</p>
                        <input
                            #fileInput
                            type="file"
                            accept="image/png,image/jpeg"
                            class="hidden"
                            (change)="onFileSelected($event)"
                        />
                    </div>
                } @else {
                    <div
                        class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between"
                    >
                        <div class="flex items-center gap-3 min-w-0">
                            <ng-icon
                                name="fluentCheckmarkCircle"
                                size="20"
                                class="text-emerald-600 shrink-0"
                            />
                            <div class="min-w-0">
                                <p class="font-medium text-slate-900 text-sm truncate">
                                    {{ receiptFileName }}
                                </p>
                                <p class="text-xs text-slate-500">{{ receiptFileSizeKB }} KB</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            (click)="removeReceipt.emit(); showErrors = false"
                            class="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer shrink-0"
                        >
                            <ng-icon name="fluentDismiss" size="16" />
                        </button>
                    </div>
                }
            </div>

            <div class="flex gap-3 mt-8">
                <app-button variant="outline" (click)="back.emit()" class="w-full">Back</app-button>
                <app-button (click)="onNext()" class="w-full">Review</app-button>
            </div>
        </div>
    `,
})
export class BookingStepPayment {
    @Input() instapayLink = '';
    @Input() walletNumber = '';
    @Input() consultationFee = 0;
    @Input() receiptFileName: string | null = null;
    @Input() receiptFileSizeKB = 0;
    @Output() fileSelected = new EventEmitter<File>();
    @Output() removeReceipt = new EventEmitter<void>();
    @Output() next = new EventEmitter<void>();
    @Output() back = new EventEmitter<void>();

    copiedKey = '';
    showErrors = false;

    copyText(text: string, key: string) {
        navigator.clipboard.writeText(text);
        this.copiedKey = key;
        setTimeout(() => (this.copiedKey = ''), 2000);
    }

    onNext() {
        if (this.receiptFileName) {
            this.next.emit();
        } else {
            this.showErrors = true;
        }
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return;
        if (!['image/png', 'image/jpeg'].includes(file.type)) return;
        this.fileSelected.emit(file);
        this.showErrors = false;
    }
}
