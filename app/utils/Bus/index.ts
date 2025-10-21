export type callback = (...args: any) => any;

export class Bus<T extends string, Params = any> {
  subscribers: Record<T, callback[]>;

  constructor() {
    this.subscribers = {} as Record<T, callback[]>;
  }

  subscribe(eventName: T, callback: callback) {
    if (this.subscribers[eventName]?.length) {
      this.subscribers[eventName].push(callback);
      return;
    }

    this.subscribers[eventName] = [callback];
  }

  unsubscribe(eventName: T, callback: callback) {
    this.subscribers[eventName] =
      this.subscribers[eventName]?.filter((listener) => {
        return callback !== listener;
      }) || [];
  }

  emit(eventName: T, ...params: Params[]) {
    this.subscribers[eventName]?.forEach((callback: callback) => {
      callback(...params);
    });
  }
}
