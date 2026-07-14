import { Component, Input, ElementRef, AfterViewInit, DestroyRef, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentPlay } from '@ng-icons/fluent-ui';

@Component({
    selector: 'app-video',
    viewProviders: [provideIcons({ fluentPlay })],
    imports: [NgIcon],
    template: `
        <div
            class="relative rounded-2xl overflow-hidden bg-slate-900 shadow-lg group cursor-pointer"
            [class.aspect-video]="!poster"
            (click)="togglePlay()"
            (keydown.enter)="togglePlay()"
            (keydown.space)="togglePlay(); $event.preventDefault()"
            tabindex="0"
            role="button"
            [attr.aria-label]="isPaused() ? 'Play video' : 'Pause video'"
        >
            <video
                #videoEl
                [src]="src"
                [poster]="poster"
                loop
                muted
                playsinline
                preload="metadata"
                class="w-full h-full object-cover"
                (click)="$event.stopPropagation()"
            ></video>

            <div
                class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10 transition-opacity duration-300"
                [class.opacity-0]="!isPaused()"
            ></div>

            @if (isPaused()) {
                <div
                    class="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                >
                    <div
                        class="size-16 sm:size-20 rounded-full bg-white/90 shadow-xl backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300"
                    >
                        <ng-icon name="fluentPlay" size="32" class="text-slate-900 ml-1" />
                    </div>
                </div>
            }

            <div
                class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <span class="text-xs text-white/80 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {{ isPaused() ? 'Click to play' : 'Playing' }}
                </span>
            </div>
        </div>
    `,
})
export class Video implements AfterViewInit {
    @Input() src!: string;
    @Input() poster?: string;
    private el = inject(ElementRef);
    private destroyRef = inject(DestroyRef);

    isPaused = signal(true);
    private videoEl!: HTMLVideoElement;

    ngAfterViewInit(): void {
        const video = this.el.nativeElement.querySelector('video') as HTMLVideoElement | null;
        if (!video) return;

        this.videoEl = video;

        video.addEventListener('play', () => this.isPaused.set(false));
        video.addEventListener('pause', () => this.isPaused.set(true));
        video.addEventListener('ended', () => this.isPaused.set(true));

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => void 0);
                } else {
                    video.pause();
                }
            },
            { threshold: 0.3 },
        );

        observer.observe(video);
        this.destroyRef.onDestroy(() => observer.disconnect());
    }

    togglePlay(): void {
        if (!this.videoEl) return;
        if (this.videoEl.paused) {
            this.videoEl.play();
        } else {
            this.videoEl.pause();
        }
    }
}
