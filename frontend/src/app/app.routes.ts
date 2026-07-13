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
        children: [{ path: '', component: Home }],
    },
    {
        path: 'admin',
        component: LayoutAdmin,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'appointments', component: Appointments },
            { path: 'settings', component: Settings },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
];
