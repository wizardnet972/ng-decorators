import { environment } from '../environments/environment';

export function NgLog(constructor) {
    if (!environment.production) {
        const LIFECYCLE_HOOKS = [
            'ngOnInit',
            'ngOnChanges',
            'ngOnDestory'
        ];

        LIFECYCLE_HOOKS.forEach(hook => {
            const original = constructor.prototype[hook];
            constructor.prototype[hook] = function () {
                console.log(`in ${hook} event!`);
                original && typeof original === 'function' && original.apply(this, arguments);
            };
        });

    }
}