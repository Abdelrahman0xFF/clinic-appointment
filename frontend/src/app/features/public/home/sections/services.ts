import { Component, Input } from '@angular/core';
import { Section } from '../../../../shared/section';
import { ServiceCard } from '../../../../shared/ui/cards/service-card';
import { Service } from '../home.types';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
    selector: 'app-services',
    imports: [Section, ServiceCard, ScrollAnimateDirective],
    template: `
        <app-section
            id="services"
            title="Our Services"
            description="Comprehensive dermatological services for all skin types and concerns."
            [class]="class"
        >
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (service of services; track service.title; let i = $index) {
                    <app-service-card
                        appScrollAnimate
                        animateDirection="up"
                        animateDelay="{{ i * 100 }}ms"
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
    @Input() class = '';
    @Input() services: Service[] = [];
}
