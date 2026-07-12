import { Component, Input, ElementRef, AfterViewInit, DestroyRef, inject } from '@angular/core';

@Component({
    selector: 'app-video',
    imports: [],
    template: `
        <div
            class="aspect-video bg-linear-to-br from-slate-300 to-slate-200 flex items-center justify-center relative rounded-xl overflow-hidden"
        >
            <video
                #videoEl
                [poster]="poster"
                [src]="src"
                loop
                muted
                playsinline
                preload="auto"
                class="w-full h-full object-cover"
            ></video>
        </div>
    `,
})
export class Video implements AfterViewInit {
    @Input() src!: string;
    @Input() poster?: string;
    private el = inject(ElementRef);
    private destroyRef = inject(DestroyRef);

    ngAfterViewInit(): void {
        const video = this.el.nativeElement.querySelector('video') as HTMLVideoElement | null;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            },
            { threshold: 0.3 },
        );

        observer.observe(video);
        this.destroyRef.onDestroy(() => observer.disconnect());
    }
}
