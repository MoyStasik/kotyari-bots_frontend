export function withPX(num: number) {
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
