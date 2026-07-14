import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UiButton } from '../../../../shared/ui/button';

@Component({
    selector: 'app-booking-step-review',
    imports: [UiButton],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">Review Your Booking</h2>

            <div class="space-y-4 mb-8 bg-slate-50 p-6 rounded-lg">
                <div class="flex justify-between items-start gap-4">
                    <span class="font-medium text-slate-700 shrink-0">Date & Time:</span>
                    <span class="text-slate-900 font-semibold text-right"
                        >{{ selectedDate }} at {{ selectedTime }}</span
                    >
                </div>
                <div class="flex justify-between items-start gap-4">
                    <span class="font-medium text-slate-700 shrink-0">Patient Name:</span>
                    <span class="text-slate-900 font-semibold text-right">{{ fullName }}</span>
                </div>
                <div class="flex justify-between items-start gap-4">
                    <span class="font-medium text-slate-700 shrink-0">Phone:</span>
                    <span class="text-slate-900 font-semibold text-right">{{ phone }}</span>
                </div>
                @if (reason) {
                    <div class="flex justify-between items-start gap-4">
                        <span class="font-medium text-slate-700 shrink-0">Reason:</span>
                        <span class="text-slate-900 font-semibold text-right max-w-xs">{{
                            reason
                        }}</span>
                    </div>
                }
                <div class="flex justify-between items-start gap-4">
                    <span class="font-medium text-slate-700 shrink-0">Receipt:</span>
                    <span class="text-emerald-600 font-semibold">Uploaded</span>
                </div>
            </div>

            @if (errorMessage) {
                <div
                    class="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                >
                    {{ errorMessage }}
                </div>
            }

            <div class="flex gap-3">
                @if (!submitting) {
                    <app-button
                        variant="outline"
                        [loading]="submitting"
                        (click)="back.emit()"
                        class="w-full"
                        >Back</app-button
                    >
                }
                <app-button
                    (click)="confirm.emit()"
                    [loading]="submitting"
                    class="w-full"
                >
                    @if (submitting) {
                        Submitting...
                    } @else {
                        Confirm & Submit
                    }
                </app-button>
            </div>
        </div>
    `,
})
export class BookingStepReview {
    @Input() selectedDate = '';
    @Input() selectedTime = '';
    @Input() fullName = '';
    @Input() phone = '';
    @Input() reason = '';
    @Input() hasReceipt = false;
    @Input() submitting = false;
    @Input() errorMessage = '';
    @Output() back = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<void>();
}
