import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-results-card',
    template: `<div
        class="aspect-square bg-linear-to-br from-slate-300 to-slate-200 flex items-center justify-center border border-slate-400 rounded-sm"
    >
        <div class="text-center">
            @if (image) {
                <img
                    [src]="image"
                    alt="Result Image"
                    class="w-full h-full object-cover rounded-sm"
                />
            } @else {
                <p class="text-slate-500 font-medium mb-2">Before / After</p>
                <p class="text-sm text-slate-400">Placeholder #{{ i }}</p>
            }
        </div>
    </div>`,
})
export class ResultsCard {
    @Input() i!: number;
    @Input() image!: string;
}
