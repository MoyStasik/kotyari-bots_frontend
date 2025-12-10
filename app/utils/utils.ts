export function withPX(num: number | string | undefined) {
  if (typeof num !== 'number') {
    return num;
  }

  return `${num}px`;
}

export function debounce(callback: (...args: any) => void, delay: number) {
  let timeout: NodeJS.Timeout;

  return function (...args: any) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => callback(...args), delay);
  };
}

export type MaybeElementOrComponent = Ref<HTMLElement | null> | Ref<ComponentPublicInstance | null>;

export const useIntersectionObserver = (
  target: MaybeElementOrComponent | MaybeElementOrComponent[],
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
  settings: {
    immediate: boolean,
  } = { immediate: true },
) => {
  const {
    root,
    rootMargin = '0px',
    threshold = 0,
  } = options;

  const { immediate } = settings;

  const isSupported = window && 'IntersectionObserver' in window;

  const noop = () => {};

  const targets = computed(() => {
    let t = target;
    if (!Array.isArray(t)) {
      t = [t];
    }

    const items = t
      .map((targetEl) => targetEl.value instanceof HTMLElement ? targetEl.value : <HTMLElement>targetEl.value?.$el)
      .filter((targetEl) => !!targetEl);

    return new Set(items);
  });

  let cleanup = noop;

  const isActive = shallowRef(immediate);

  const stopWatch = isSupported
    ? watch(
        () => [targets.value, isActive.value] as const,
        ([targets]) => {
          cleanup();
          if (!isActive.value)
            return;

          if (!targets.size)
            return;

          const observer = new IntersectionObserver(
            callback,
            {
              root,
              rootMargin,
              threshold,
            },
          );

          targets.forEach((el) => el && observer.observe(el));

          cleanup = () => {
            observer.disconnect();
            cleanup = noop;
          };
        },
        { immediate, flush: 'post' },
      )
    : noop;

  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };

  if (getCurrentInstance()) {
    onBeforeUnmount(stop);
  }

  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop,
  };
};
