export type NonVoid<T> = T extends void ? never : T;

export type ExtractPluginProvide<
  T extends ReturnType<typeof defineNuxtPlugin>,
> = NonNullable<NonVoid<Awaited<ReturnType<T>>>['provide']>;
