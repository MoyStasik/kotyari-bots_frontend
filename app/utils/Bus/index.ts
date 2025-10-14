type callback = (...args: any) => any;

export class Bus {
  subscribers: Record<string, callback[]>;

  constructor() {
    this.subscribers = {} as Record<string, callback[]>;
  }

  subscribe(eventName: string, callback: callback) {
    if (this.subscribers[eventName]?.length) {
      this.subscribers[eventName].push(callback);
      return;
    }

    this.subscribers[eventName] = [callback];
  }

  unsubscribe(eventName: string, callback: callback) {
    this.subscribers[eventName] =
      this.subscribers[eventName]?.filter((listener) => {
        return callback !== listener;
      }) || [];
  }

  emit(eventName: string, params?: any) {
    this.subscribers[eventName]?.forEach((callback: callback) => {
      callback(...params);
    });
  }
}
