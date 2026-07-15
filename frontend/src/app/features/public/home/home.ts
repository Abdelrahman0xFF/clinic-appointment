import { Component, inject, OnInit, computed } from '@angular/core';
import { Hero } from './sections/hero';
import { About } from './sections/about';
import { Services } from './sections/services';
import { Results } from './sections/results';
import { Testimonials } from './sections/testimonials';
import { Blog } from './sections/blog';
import { Visit } from './sections/visit';
import { ClinicApi } from '../../../core/api/clinic/clinic.service';
import { BlogApi } from '../../../core/api/blog/blog.service';
import { Service, ResultItem } from './home.types';

@Component({
    selector: 'app-home',
    imports: [Hero, About, Services, Results, Testimonials, Blog, Visit],
    template: `
        <app-hero class="border-y" [credentials]="credentials()" />
        <app-about class="bg-white border-y" />
        <app-services class="border-y" />
        <app-results class="bg-white border-y" [results]="results" />
        <app-testimonials class="border-y" />
        <app-blog class="bg-white border-y" [posts]="blogPosts()" />
        <app-visit class="border-y" [address]="address()" [phone]="phone()" />
    `,
})
export class Home implements OnInit {
    private clinicApi = inject(ClinicApi);
    private blogApi = inject(BlogApi);

    address = computed(() => this.clinicApi.clinicData()?.address ?? '');
    phone = computed(() => this.clinicApi.clinicData()?.phone ?? '');
    credentials = computed(() => this.clinicApi.clinicData()?.credentials ?? []);
    services: Service[] = [
        {
            icon: 'fluentStethoscope',
            title: 'General Dermatology',
            description: 'Treatment of skin diseases and conditions',
        },
        {
            icon: 'fluentHeartPulse',
            title: 'Skin Health',
            description: 'Preventive care for healthy skin',
        },
        {
            icon: 'fluentSyringe',
            title: 'Injectable Treatments',
            description: 'Botox, fillers, and aesthetic injectables',
        },
        {
            icon: 'fluentClipboardTaskListLtr',
            title: 'Laser Therapy',
            description: 'Advanced laser treatments for skin rejuvenation',
        },
        {
            icon: 'fluentPulse',
            title: 'Acne Treatment',
            description: 'Specialized acne management and scar revision',
        },
        {
            icon: 'fluentPeople',
            title: 'Consultations',
            description: 'Personalized consultation services for skin care needs',
        },
    ];
    results: ResultItem[] = [
        {
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop&auto=format',
        },
        {
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=600&fit=crop&auto=format',
        },
        {
            image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=600&fit=crop&auto=format',
        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1681996486893-a48ea4667cb5?w=600&h=600&fit=crop&auto=format',
        },
        {
            image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=600&fit=crop&auto=format',
        },
        {
            image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=600&fit=crop&auto=format',
        },
    ];

    get blogPosts() {
        return this.blogApi.posts;
    }

    ngOnInit() {
        this.clinicApi.getInfo();
        this.blogApi.getPosts(1, 3);
    }
}
