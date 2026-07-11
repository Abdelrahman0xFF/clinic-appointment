import { Component, Input } from '@angular/core';

function cva(
    base: string,
    config: {
        variants: Record<string, Record<string, string>>;
        defaultVariants: Record<string, string>;
    },
) {
    return (props: Record<string, string | undefined>): string => {
        const classes = [base];
        for (const [name, map] of Object.entries(config.variants)) {
            const value = props[name] ?? config.defaultVariants[name];
            if (value && map[value]) {
                classes.push(map[value]);
            }
        }
        return classes.join(' ');
    };
}

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
                outline:
                    'border-ring bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
                secondary:
                    'bg-secondary text-secondary-foreground border-transparent hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
                ghost: 'border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
                destructive:
                    'bg-destructive/10 text-destructive border-transparent hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
                link: 'text-primary underline-offset-4 border-transparent hover:underline',
            },
            size: {
                default:
                    'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
                xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
                icon: 'size-8',
                'icon-xs':
                    "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                'icon-sm':
                    'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
                'icon-lg': 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

@Component({
    selector: 'app-ui-button',
    standalone: true,
    template: `
        <button data-slot="button" type="button" [class]="classes">
            <ng-content></ng-content>
        </button>
    `,
})
export class UiButton {
    @Input() variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link' =
        'default';

    @Input() size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg' =
        'default';

    get classes(): string {
        return buttonVariants({ variant: this.variant, size: this.size });
    }
}
