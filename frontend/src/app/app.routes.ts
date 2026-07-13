import { Routes } from '@angular/router';
import { LayoutAdmin } from './core/layout/admin';
import { LayoutPublic } from './core/layout/public';
import { Dashboard } from './features/dashboard/dashboard';
import { Appointments } from './features/appointments/appointments';
import { Settings } from './features/settings/settings';
import { Home } from './features/home/home';

export const routes: Routes = [
    {
        path: '',
        component: LayoutPublic,
        children: [
            { path: '', component: Home },
            {
                path: 'blog',
                loadComponent: () => import('./features/blog/blog').then((m) => m.Blog),
            },
            {
                path: 'blog/:id',
                loadComponent: () => import('./features/blog/article').then((m) => m.Article),
            },
            {
                path: 'booking',
                loadComponent: () => import('./features/booking/booking').then((m) => m.Booking),
            },
        ],
    },
    {
        path: 'admin',
        component: LayoutAdmin,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'appointments', component: Appointments },
            { path: 'settings', component: Settings },
            {
                path: 'blog',
                loadComponent: () => import('./features/blogs/blogs').then((m) => m.Blogs),
            },
            {
                path: 'queue',
                loadComponent: () => import('./features/queue/queue').then((m) => m.Queue),
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
];
