import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentDelete } from '@ng-icons/fluent-ui';
import { UiButton } from '../../../shared/ui/button';

@Component({
    selector: 'app-blogs-delete-dialog',
    imports: [NgIcon, UiButton],
    viewProviders: [provideIcons({ fluentDelete })],
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
                    <div class="text-center">
                        <span class="size-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                            <ng-icon name="fluentDelete" size="24" class="text-red-500" />
                        </span>
                        <h2 class="text-lg font-bold text-slate-900 mb-1">Delete Post</h2>
                        <p class="text-sm text-slate-500 mb-6">
                            Are you sure you want to delete
                            <span class="font-medium text-slate-700">"{{ postTitle }}"</span>?
                            This action cannot be undone.
                        </p>
                        <div class="flex justify-center gap-3">
                            <app-button variant="outline" (click)="dismiss.emit()">Cancel</app-button>
                            <app-button variant="destructive" (click)="confirm.emit()">Delete</app-button>
                        </div>
                    </div>
                </div>
            </div>
        }
    `,
})
export class BlogsDeleteDialog {
    @Input() open = false;
    @Input() postTitle = '';
    @Output() confirm = new EventEmitter<void>();
    @Output() dismiss = new EventEmitter<void>();
}
