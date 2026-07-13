import { Routes } from '@angular/router';
import { LayoutAdmin } from './core/layout/admin';
import { LayoutPublic } from './core/layout/public';
import { Dashboard } from './features/dashboard/dashboard';
import { Home } from './features/home/home';

export const routes: Routes = [
    {
        path: '',
        component: LayoutPublic,
        children: [
            { path: '', component: Home },
            { path: 'booking', loadComponent: () => import('./features/home/home').then((m) => m.Home) },
            { path: 'blog', loadComponent: () => import('./features/home/home').then((m) => m.Home) },
        ],
    },
    {
        path: 'admin',
        component: LayoutAdmin,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
];
