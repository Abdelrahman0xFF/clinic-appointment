import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';
import { TopLoadingBar } from './shared/ui/top-loading-bar/top-loading-bar';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastComponent, TopLoadingBar],
    standalone: true,
    template: `
        <app-top-loading-bar />
        <router-outlet />
        <app-toast />
    `,
})
export class App {}
