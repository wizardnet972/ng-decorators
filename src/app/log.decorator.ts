import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export function log$(target, properyKey) {
    let propertyValue;

    function getter() {
        return propertyValue;
    }

    function setter(value) {
        if (value instanceof Observable) {
            propertyValue = value.do(res => {
                const isArray = Array.isArray(res) && typeof res[0] === 'object';
                const action = isArray ? 'table' : 'log';
                console.groupCollapsed(properyKey);
                console[action](res);
                console.groupEnd();
            });
        } else {
            propertyValue = value;
        }
    }

    Object.defineProperty(target, properyKey, {
        set: setter,
        get: getter,
        configurable: true,
        enumerable: true
    });
}
