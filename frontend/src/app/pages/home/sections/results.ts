import { Component, Input } from '@angular/core';
import { Section } from '../../../components/section/section';
import { ResultsCard } from '../../../components/ui/cards/results-card';

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
            @for (result of placeholderResults; track result) {
                <app-results-card [i]="result" />
            }
        </div>
    </app-section>`,
})
export class Results {
    @Input() class = '';
    placeholderResults = [1, 2, 3, 4, 5, 6];
}
