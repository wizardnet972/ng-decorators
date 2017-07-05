import { Subject } from 'rxjs/Subject';

export function TakeUntil(constructor) {
    const whenDestory = new Subject<any>();
    const original = constructor.prototype.ngOnDestroy;
    let subject;

    constructor.prototype.componentDestroy = function () {
        subject = new Subject<any>();
        return subject.asObservable();
    }

    constructor.prototype.ngOnDestroy = function () {
        original && typeof original === 'function' && original.apply(this, arguments);
        subject.next('ngOnDestroy');
        subject.unsubsribe();
    }
}
