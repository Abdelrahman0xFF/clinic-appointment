import { Component, Input } from '@angular/core';
import { Section } from '../../../../shared/section';
import { ResultsCard } from '../../../../shared/ui/cards/results-card';
import { ScrollAnimateDirective } from '../../../../shared/directives/scroll-animate.directive';

@Component({
    selector: 'app-results',
    imports: [Section, ResultsCard, ScrollAnimateDirective],
    template: `
        <app-section
            id="results"
            title="Results &amp; Highlights"
            description="Visible improvements from our treatments."
            [class]="class"
        >
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
                @for (result of results; track result.image; let i = $index) {
                    <app-results-card 
                        appScrollAnimate 
                        animateDirection="zoom" 
                        animateDelay="{{ i * 100 }}ms"
                        [image]="result.image" 
                    />
                }
            </div>
        </app-section>
    `,
})
export class Results {
    @Input() class = '';
    @Input() results: { image: string }[] = [];
}
