import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastComponent],
    standalone: true,
    template: `
        <router-outlet />
        <app-toast />
    `,
})
export class App {}
