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
        <app-hero class="border-y" />
        <app-about class="bg-white border-y" />
        <app-services class="border-y" />
        <app-results class="bg-white border-y" />
        <app-testimonials class="border-y" />
        <app-blog class="bg-white border-y" />
        <app-visit class="border-y" />
    `,
})
export class Home {}
