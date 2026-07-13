import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-section',
    imports: [],
    template: `<div [class]="class">
        <section id="{{ id }}" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            @if (title) {
                <div class="mb-12">
                    <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{{ title }}</h2>
                    @if (description) {
                        <p class="text-lg text-slate-600 max-w-2xl">{{ description }}</p>
                    }
                </div>
            }
            <ng-content />
        </section>
    </div>`,
})
export class Section {
    @Input() id?: string;
    @Input() title?: string;
    @Input() description?: string;
    @Input() class = '';
}
