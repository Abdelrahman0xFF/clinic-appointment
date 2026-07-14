import { Component, Input } from '@angular/core';
import { Section } from '../../../../shared/section';
import { ResultsCard } from '../../../../shared/ui/cards/results-card';

@Component({
    selector: 'app-results',
    imports: [Section, ResultsCard],
    template: `
        <app-section
            id="results"
            title="Results &amp; Highlights"
            description="Visible improvements from our treatments."
            [class]="class"
        >
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                @for (result of results; track result.image) {
                    <app-results-card [image]="result.image" />
                }
            </div>
        </app-section>
    `,
})
export class Results {
    @Input() class = '';
    @Input() results: { image: string }[] = [];
}
