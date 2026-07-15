import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentRibbon, fluentAdd, fluentDismiss } from '@ng-icons/fluent-ui';

@Component({
    viewProviders: [provideIcons({ fluentRibbon, fluentAdd, fluentDismiss })],
    selector: 'app-settings-credentials',
    imports: [NgIcon],
    template: `
        <div class="rounded-xl border border-slate-200 bg-white p-6 h-full flex flex-col">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <span
                    class="flex items-center justify-center size-10 rounded-xl bg-purple-100 text-purple-600"
                >
                    <ng-icon name="fluentRibbon" size="22" />
                </span>
                <div>
                    <h2 class="text-lg font-bold text-slate-900">Credentials</h2>
                    <p class="text-sm text-slate-500">Licenses and certifications</p>
                </div>
            </div>

            <div class="space-y-2.5 mb-4">
                @for (cred of credentials; track i; let i = $index) {
                    <div class="flex items-center gap-2">
                        <input
                            type="text"
                            [value]="cred"
                            (input)="updateCredential(i, $any($event.target).value)"
                            class="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                        <button
                            type="button"
                            (click)="removeCredential(i)"
                            class="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition cursor-pointer shrink-0"
                            title="Remove"
                        >
                            <ng-icon name="fluentDismiss" size="16" />
                        </button>
                    </div>
                }
            </div>

            <button
                type="button"
                (click)="addCredential()"
                class="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-lg border border-dashed border-slate-300 text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
            >
                <ng-icon name="fluentAdd" size="16" />
                Add Credential
            </button>
        </div>
    `,
})
export class SettingsCredentials {
    @Input() credentials: string[] = [];
    @Output() credentialsChange = new EventEmitter<string[]>();

    updateCredential(index: number, value: string) {
        const updated = [...this.credentials];
        updated[index] = value;
        this.credentialsChange.emit(updated);
    }

    removeCredential(index: number) {
        const updated = this.credentials.filter((_, i) => i !== index);
        this.credentialsChange.emit(updated);
    }

    addCredential() {
        this.credentialsChange.emit([...this.credentials, '']);
    }
}
