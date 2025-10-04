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
