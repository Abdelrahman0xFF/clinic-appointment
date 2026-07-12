import { Component, Input, inject } from '@angular/core';
import { Section } from '../../../components/section/section';
import { ResultsCard } from '../../../components/ui/cards/results-card';
import { ClinicService } from '../../../services/clinic.service';

@Component({
    selector: 'app-results',
    imports: [Section, ResultsCard],
    template: ` <app-section
        id="results"
        title="Results & Highlights"
        description="Visible improvements from our treatments."
        [class]="class"
    >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (result of results; track result.id) {
                <app-results-card [i]="result.id" />
            }
        </div>
    </app-section>`,
})
export class Results {
    @Input() class = '';
    private clinic = inject(ClinicService);
    results = this.clinic.results;
}
