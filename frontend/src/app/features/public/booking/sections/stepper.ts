import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentCheckmark } from '@ng-icons/fluent-ui';

@Component({
    selector: 'app-booking-stepper',
    imports: [NgIcon],
    viewProviders: [provideIcons({ fluentCheckmark })],
    template: `
        <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
                @for (s of [1, 2, 3, 4]; track s) {
                    <div class="flex items-center gap-2 flex-1">
                        <div
                            [class]="
                                'flex-1 h-1 rounded-full transition ' +
                                (s < current
                                    ? 'bg-emerald-500'
                                    : s === current
                                      ? 'bg-blue-600'
                                      : 'bg-slate-200')
                            "
                        ></div>
                        <div
                            [class]="
                                'size-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ' +
                                (s < current
                                    ? 'bg-emerald-500 text-white'
                                    : s === current
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-slate-200 text-slate-600')
                            "
                        >
                            @if (s < current) {
                                <ng-icon name="fluentCheckmark" size="18" />
                            } @else {
                                {{ s }}
                            }
                        </div>
                    </div>
                }
            </div>
            <div class="hidden sm:flex justify-between text-xs font-medium text-slate-600">
                <span>Date & Time</span>
                <span>Your Details</span>
                <span>Payment</span>
                <span>Review</span>
            </div>
            <div class="sm:hidden text-center mt-2 text-sm font-medium text-blue-600">
                {{ getStepLabel(current) }}
            </div>
        </div>
    `,
})
export class BookingStepper {
    @Input() current = 1;

    getStepLabel(step: number): string {
        switch (step) {
            case 1: return 'Date & Time';
            case 2: return 'Your Details';
            case 3: return 'Payment';
            case 4: return 'Review';
            default: return '';
        }
    }
}
