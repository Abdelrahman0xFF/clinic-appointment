import { Component, Input } from '@angular/core';
import { Section } from '../../../../shared/section';
import { Video } from '../../../../shared/ui/video';

@Component({
    selector: 'app-testimonials',
    imports: [Section, Video],
    template: `<app-section
        id="testimonials"
        title="What Our Patients Say"
        description="Hear from those who have experienced our care."
        [class]="class"
    >
        <app-video src="assets/testimonials/video.mp4" />
    </app-section>`,
})
export class Testimonials {
    @Input() class = '';
}
