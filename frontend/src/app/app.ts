import { Component } from '@angular/core';
import { LayoutPublic } from './layouts/layout-public/layout-public';

@Component({
    selector: 'app-root',
    imports: [LayoutPublic],
    standalone: true,
    template: `<app-layout-public> </app-layout-public>`,
})
export class App {}
