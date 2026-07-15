import {
    Directive,
    ElementRef,
    Input,
    AfterViewInit,
    OnDestroy,
    inject,
} from '@angular/core';

@Directive({
    selector: '[appScrollAnimate]',
    standalone: true,
})
export class ScrollAnimateDirective implements AfterViewInit, OnDestroy {
    @Input() animateDelay = '0ms';
    @Input() animateDuration = '700ms';
    @Input() animateDirection: 'up' | 'left' | 'right' | 'zoom' | 'fade' = 'up';

    private el = inject(ElementRef);
    private observer: IntersectionObserver | null = null;

    ngAfterViewInit() {
        const element = this.el.nativeElement as HTMLElement;
        
        let initialTransform = '';
        switch (this.animateDirection) {
            case 'up': initialTransform = 'translateY(40px)'; break;
            case 'left': initialTransform = 'translateX(-40px)'; break;
            case 'right': initialTransform = 'translateX(40px)'; break;
            case 'zoom': initialTransform = 'scale(0.95)'; break;
            case 'fade': initialTransform = 'none'; break;
        }

        element.style.opacity = '0';
        element.style.transform = initialTransform;
        element.style.transition = `opacity ${this.animateDuration} ease-out ${this.animateDelay}, transform ${this.animateDuration} cubic-bezier(0.16, 1, 0.3, 1) ${this.animateDelay}`;

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        element.style.opacity = '1';
                        element.style.transform = this.animateDirection === 'zoom' ? 'scale(1)' : (this.animateDirection === 'fade' ? 'none' : 'translate(0, 0)');
                        this.observer?.unobserve(element);
                        
                        // Clear inline styles after animation completes to allow hover effects to take over
                        const durationMs = parseInt(this.animateDuration) || 700;
                        const delayMs = parseInt(this.animateDelay) || 0;
                        setTimeout(() => {
                            element.style.transition = '';
                            element.style.opacity = '';
                            element.style.transform = '';
                        }, durationMs + delayMs + 50);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        this.observer.observe(element);
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
