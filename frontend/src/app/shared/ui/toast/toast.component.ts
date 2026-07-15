import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    fluentDismiss,
    fluentCheckmarkCircle,
    fluentErrorCircle,
    fluentInfo,
} from '@ng-icons/fluent-ui';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule, NgIcon],
    viewProviders: [
        provideIcons({
            fluentDismiss,
            fluentCheckmarkCircle,
            fluentErrorCircle,
            fluentInfo,
        }),
    ],
    template: `
        <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            @for (toast of toastService.toasts(); track toast.id) {
                <div
                    class="pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-lg shadow-lg border min-w-75 max-w-100 transition-all duration-300"
                    [ngClass]="{
                        'border-green-500': toast.type === 'success',
                        'border-red-500': toast.type === 'error',
                        'border-blue-500': toast.type === 'info',
                    }"
                >
                    <div
                        [ngClass]="{
                            'text-green-500': toast.type === 'success',
                            'text-red-500': toast.type === 'error',
                            'text-blue-500': toast.type === 'info',
                        }"
                        class="mt-0.5 shrink-0"
                    >
                        @if (toast.type === 'success') {
                            <ng-icon name="fluentCheckmarkCircle" size="20" />
                        } @else if (toast.type === 'error') {
                            <ng-icon name="fluentErrorCircle" size="20" />
                        } @else {
                            <ng-icon name="fluentInfo" size="20" />
                        }
                    </div>

                    <div class="flex-1 text-sm font-medium text-slate-800">
                        {{ toast.message }}
                    </div>

                    <button
                        type="button"
                        class="shrink-0 text-slate-400 hover:text-slate-600 transition"
                        (click)="toastService.remove(toast.id)"
                    >
                        <ng-icon name="fluentDismiss" size="16" />
                    </button>
                </div>
            }
        </div>
    `,
})
export class ToastComponent {
    public toastService = inject(ToastService);
}
