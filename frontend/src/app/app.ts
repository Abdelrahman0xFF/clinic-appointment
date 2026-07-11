import { Component } from '@angular/core';
import { LayoutPublic } from './layouts/public/public';
import { Home } from './pages/home/home';

@Component({
    selector: 'app-root',
    imports: [LayoutPublic, Home],
    standalone: true,
    template: `<app-layout-public> <app-home /></app-layout-public>`,
})
export class App {}
