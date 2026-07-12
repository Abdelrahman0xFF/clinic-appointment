import { Component } from '@angular/core';
import { Hero } from './sections/hero';
import { About } from './sections/about';
import { Services } from './sections/services';
import { Results } from './sections/results';
import { Testimonials } from './sections/testimonials';
import { Blog } from './sections/blog';
import { Visit } from './sections/visit';

@Component({
    selector: 'app-home',
    imports: [Hero, About, Services, Results, Testimonials, Blog, Visit],
    template: `
        <app-hero />
        <app-about class="bg-white" />
        <app-services />
        <app-results class="bg-white" />
        <app-testimonials />
        <app-blog class="bg-white" />
        <app-visit />
    `,
})
export class Home {}
