export function cva(
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
