import { Component, Input } from '@angular/core';
import { Section } from '../../../shared/section';

@Component({
    selector: 'app-about',
    imports: [Section],
    template: `
        <app-section
            id="about"
            title="About Us"
            description="We are a leading healthcare provider committed to delivering exceptional medical services and patient care."
            [class]="class"
        ></app-section>
    `,
})
export class About {
    @Input() class = '';
}
