import { Component } from '@angular/core';
import { LayoutPublic } from './core/layout/public';
import { Home } from './features/home/home';

@Component({
    selector: 'app-root',
    imports: [LayoutPublic, Home],
    standalone: true,
    template: `<app-layout-public> <app-home /></app-layout-public>`,
})
export class App {}
