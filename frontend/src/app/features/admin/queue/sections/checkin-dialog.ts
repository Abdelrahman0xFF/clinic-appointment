import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentDismiss } from '@ng-icons/fluent-ui';
import { UiButton } from '../../../../shared/ui/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-queue-checkin-dialog',
    imports: [NgIcon, UiButton, FormsModule],
    viewProviders: [provideIcons({ fluentDismiss })],
    template: `
        @if (open) {
            <div class="fixed inset-0 z-50 flex items-center justify-center"
                 (click)="dismiss.emit()"
                 (keydown.escape)="dismiss.emit()"
                 tabindex="0"
                 role="dialog">
                <div class="fixed inset-0 bg-black/40"></div>
                <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 z-10 p-6"
                     tabindex="-1"
                     (click)="$event.stopPropagation()"
                     (keydown)="$event.stopPropagation()">
                    <div class="flex items-center justify-between mb-5">
                        <h2 class="text-lg font-bold text-slate-900">Check In Patient</h2>
                        <button (click)="dismiss.emit()"
                                class="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer">
                            <ng-icon name="fluentDismiss" size="20" />
                        </button>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label for="checkin-name" class="block text-sm font-medium text-slate-900 mb-1.5">Patient Name *</label>
                            <input id="checkin-name" type="text" [(ngModel)]="formName"
                                   placeholder="Enter patient name"
                                   class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
                        <app-button variant="outline" (click)="dismiss.emit()">Cancel</app-button>
                        <app-button (click)="emitSave()">Check In</app-button>
                    </div>
                </div>
            </div>
        }
    `,
})
export class QueueCheckinDialog implements OnChanges {
    @Input() open = false;
    @Output() save = new EventEmitter<string>();
    @Output() dismiss = new EventEmitter<void>();

    formName = '';

    ngOnChanges(changes: SimpleChanges) {
        if (changes['open'] && !this.open) {
            this.formName = '';
        }
    }

    emitSave() {
        if (!this.formName?.trim()) return;
        this.save.emit(this.formName.trim());
        this.formName = '';
    }
}
