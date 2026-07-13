import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentCheckmarkCircle } from '@ng-icons/fluent-ui';
import { UiButton } from '../../../shared/ui/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-booking-step-success',
    imports: [NgIcon, UiButton, RouterLink],
    viewProviders: [provideIcons({ fluentCheckmarkCircle })],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 lg:p-8 text-center">
            <div class="flex justify-center mb-6">
                <div class="size-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <ng-icon name="fluentCheckmarkCircle" size="32" class="text-emerald-600" />
                </div>
            </div>

            <h2 class="text-3xl font-bold text-slate-900 mb-2">Booking Request Received!</h2>
            <p class="text-slate-500 mb-8 max-w-md mx-auto">
                Thank you for booking with MediCare Clinic. Your appointment request is pending
                review and you will receive confirmation soon.
            </p>

            <div
                class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left max-w-md mx-auto"
            >
                <div class="space-y-4">
                    <div>
                        <p class="text-sm font-medium text-slate-600">Reference Number</p>
                        <code class="text-lg font-bold text-blue-700"
                            >#MC-{{ referenceNumber }}</code
                        >
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm font-medium text-slate-600">Date</p>
                            <p class="text-slate-900 font-semibold">{{ selectedDate }}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-slate-600">Time</p>
                            <p class="text-slate-900 font-semibold">{{ selectedTime }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-slate-600">Clinic Address</p>
                        <p class="text-slate-900">{{ address }}</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <a routerLink="/" class="w-full">
                    <app-button variant="outline" class="w-full">Back to Home</app-button>
                </a>
            </div>
        </div>
    `,
})
export class BookingStepSuccess {
    @Input() selectedDate = '';
    @Input() selectedTime = '';
    @Input() referenceNumber = '';
    @Input() address = '';
}
