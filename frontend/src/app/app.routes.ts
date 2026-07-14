import { Routes } from '@angular/router';
import { LayoutAdmin } from './core/layout/admin';
import { LayoutPublic } from './core/layout/public';
import { Dashboard } from './features/admin/dashboard/dashboard';
import { Appointments } from './features/admin/appointments/appointments';
import { Settings } from './features/admin/settings/settings';
import { Queue } from './features/admin/queue/queue';
import { Blogs } from './features/admin/blogs/blogs';

import { Article } from './features/public/blog/article';
import { Blog } from './features/public/blog/blog';
import { Booking } from './features/public/booking/booking';
import { Home } from './features/public/home/home';

export const routes: Routes = [
    {
        path: '',
        component: LayoutPublic,
        children: [
            { path: '', component: Home },
            { path: 'blog', component: Blog },
            { path: 'blog/:id', component: Article },
            { path: 'booking', component: Booking },
        ],
    },
    {
        path: 'admin',
        component: LayoutAdmin,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'appointments', component: Appointments },
            { path: 'settings', component: Settings },
            { path: 'blog', component: Blogs },
            { path: 'queue', component: Queue },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
];
