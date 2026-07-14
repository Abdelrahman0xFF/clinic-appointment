import { Component, inject, Input } from '@angular/core';
import { Section } from '../../../../shared/section';
import { ServiceCard } from '../../../../shared/ui/cards/service-card';
import { ClinicService } from '../../../../core/clinic';

@Component({
    selector: 'app-services',
    imports: [Section, ServiceCard],
    template: `
        <app-section
            id="services"
            title="Our Services"
            description="Comprehensive dermatological services for all skin types and concerns."
            [class]="class"
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
    @Input() class = '';
    private clinic = inject(ClinicService);
    services = this.clinic.services;
}
