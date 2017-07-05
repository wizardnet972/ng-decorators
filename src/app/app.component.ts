import { Component, OnDestroy } from '@angular/core';
import { interval } from 'rxjs/Observable/interval';
import { AutoUnsubscribe } from './auto-unsubscribe.decorator';
import { TakeUntil } from './take-until.decorator';
import { NgLog } from './ng-log.decorator';
import { log$ } from './log.decorator';

import 'rxjs/add/operator/takeUntil';

@AutoUnsubscribe(['two$'])
@Component({
  selector: 'app-root',
  template: `welcome!`
})
@NgLog
@TakeUntil
export class AppComponent implements OnDestroy {
  @log$ first$;
  two$;
  third$;

  componentDestroy;

  constructor() {
    this.first$ = interval(1000);
    this.first$.subscribe(i => console.log('first ', i));

    this.two$ = interval(3000).subscribe(i => console.log('two ', i));
    this.third$ = interval(4000).subscribe(i => console.log('third ', i));

    interval(500)
      .takeUntil(this.componentDestroy())
      .subscribe(i => console.log('until ', i));
  }

  ngOnDestroy() {
    console.log('in ngOnDestroy');
  }
}
