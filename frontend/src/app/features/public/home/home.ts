import { Component, inject, OnInit, computed } from '@angular/core';
import { Hero } from './sections/hero';
import { About } from './sections/about';
import { Services } from './sections/services';
import { Results } from './sections/results';
import { Testimonials } from './sections/testimonials';
import { Blog } from './sections/blog';
import { Visit } from './sections/visit';
import { ClinicService } from '../../../core/api/clinic/clinic.service';
import { Service, ResultItem } from './home.types';
import { BlogPost } from '../../../core/api/blog/blog.types';

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
        <app-visit class="border-y" [address]="address()" [phone]="phone()" />
    `,
})
export class Home implements OnInit {
    private clinic = inject(ClinicService);

    address = computed(() => this.clinic.clinicData()?.address ?? '');
    phone = computed(() => this.clinic.clinicData()?.phone ?? '');
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
    results: ResultItem[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
    posts: BlogPost[] = [
        {
            title: 'The Complete Guide to Modern Acne Treatment',
            excerpt:
                'Learn about the latest approaches to treating acne, from topical treatments to advanced laser therapy.',
            category: 'Skin & Beauty',
            date: 'Mar 15, 2024',
        },
        {
            title: "Managing Eczema: A Patient's Guide",
            excerpt:
                'Practical strategies for managing eczema symptoms and improving quality of life.',
            category: 'General Health',
            date: 'Mar 08, 2024',
        },
        {
            title: 'Understanding Laser Hair Removal',
            excerpt:
                'Everything you need to know about laser hair removal: how it works, effectiveness, and aftercare.',
            category: 'Skin & Beauty',
            date: 'Mar 01, 2024',
        },
    ];

    ngOnInit() {
        this.clinic.getInfo();
    }
}
