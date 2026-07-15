import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-top-loading-bar',
    standalone: true,
    imports: [NgClass],
    template: `
        <div 
            class="fixed top-0 left-0 right-0 h-1 z-9999 pointer-events-none transition-opacity duration-300"
            [ngClass]="loadingService.isLoading() ? 'opacity-100' : 'opacity-0'"
        >
            <div 
                class="h-full bg-blue-600 shadow-[0_0_10px_#2563eb,0_0_5px_#2563eb]"
                [ngClass]="loadingService.isLoading() ? 'animate-indeterminate-bar' : ''"
            ></div>
        </div>
    `,
    styles: [`
        @keyframes indeterminate-bar {
            0% {
                transform: translateX(-100%) scaleX(0.2);
            }
            50% {
                transform: translateX(0) scaleX(0.5);
            }
            100% {
                transform: translateX(100%) scaleX(1);
            }
        }
        .animate-indeterminate-bar {
            transform-origin: left;
            animation: indeterminate-bar 1.5s infinite linear;
        }
    `]
})
export class TopLoadingBar {
    loadingService = inject(LoadingService);
}
