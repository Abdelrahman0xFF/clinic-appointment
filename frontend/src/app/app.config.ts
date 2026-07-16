import {
    ApplicationConfig,
    APP_INITIALIZER,
    provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiInterceptor } from './core/api/api.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideRouter(
            routes,
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled',
            }),
        ),
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: (viewportScroller: ViewportScroller) => () => {
                viewportScroller.setOffset(() => [0, resolvePublicNavHeight()]);
            },
            deps: [ViewportScroller],
        },
    ],
};

function resolvePublicNavHeight(): number {
    if (typeof document === 'undefined') {
        return 80;
    }

    const rawValue = getComputedStyle(document.documentElement)
        .getPropertyValue('--public-nav-height')
        .trim();

    if (rawValue.endsWith('px')) {
        return Number.parseFloat(rawValue) || 80;
    }

    if (rawValue.endsWith('rem') || rawValue.endsWith('em')) {
        const rootFontSize = Number.parseFloat(
            getComputedStyle(document.documentElement).fontSize || '16',
        );
        return (Number.parseFloat(rawValue) || 5) * rootFontSize;
    }

    return Number.parseFloat(rawValue) || 80;
}
