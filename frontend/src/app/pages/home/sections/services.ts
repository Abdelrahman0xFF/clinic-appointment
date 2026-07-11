import { Component } from '@angular/core';
import { Section } from '../../../components/section/section';
import { ServiceCard } from '../../../components/ui/cards/service-card';

@Component({
    selector: 'app-services',
    imports: [Section, ServiceCard],
    template: `
        <app-section
            id="services"
            title="Our Services"
            description="Comprehensive dermatological services for all skin types and concerns."
        >
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (service of services; track service.title) {
                    <app-service-card
                        title="{{ service.title }}"
                        description="{{ service.description }}"
                        icon="{{ service.icon }}"
                    />
                }
            </div>
        </app-section>
    `,
})
export class Services {
    services = [
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
}
