export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number, digits = 1): number {
  return Number((Math.random() * (max - min) + min).toFixed(digits));
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomInt(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[], count: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
