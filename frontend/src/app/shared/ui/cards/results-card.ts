import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentHeart } from '@ng-icons/fluent-ui';

@Component({
    standalone: true,
    selector: 'app-results-card',
    viewProviders: [provideIcons({ fluentHeart })],
    imports: [NgIcon],
    template: `
        <div
            class="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
        >
            @if (image) {
                <img
                    [src]="image"
                    alt="Treatment Result"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div
                    class="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
                <div
                    class="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    <span
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/90 text-slate-800 rounded-full backdrop-blur-sm shadow-sm"
                    >
                        <ng-icon name="fluentHeart" size="14" class="text-red-500" />
                        Before & After
                    </span>
                </div>
            } @else {
                <div class="w-full h-full flex items-center justify-center">
                    <span class="text-slate-400 text-sm">No Image</span>
                </div>
            }
        </div>
    `,
})
export class ResultsCard {
    @Input() image = '';
}
