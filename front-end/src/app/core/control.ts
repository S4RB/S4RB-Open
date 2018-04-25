import { Subscription } from 'rxjs/Subscription';

export abstract class Control {
  private subscriptions: Subscription[] = [];

  constructor() {}

  protected safeSubscription(sub: Subscription): Subscription {
    this.subscriptions.push(sub);
    return sub;
  }

  protected unsubscribeAll() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
