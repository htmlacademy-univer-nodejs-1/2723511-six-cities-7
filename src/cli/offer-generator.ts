import { CITY_COORDINATES } from '../const.js';
import { getRandomFloat, getRandomInt, getRandomItem, getRandomItems } from '../helpers/random.js';
import { MockServerData } from '../types/mock-server-data.type.js';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const PASSWORD_ALPHABET = [...'abcdefghijklmnopqrstuvwxyz0123456789'];

export class OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const { mockData } = this;
    const city = getRandomItem(mockData.cities);
    const user = getRandomItem(mockData.users);
    const { latitude, longitude } = CITY_COORDINATES[city];

    const password = Array.from(
      { length: getRandomInt(6, 12) },
      () => getRandomItem(PASSWORD_ALPHABET),
    ).join('');

    return [
      getRandomItem(mockData.titles),
      getRandomItem(mockData.descriptions),
      new Date(Date.now() - getRandomInt(0, WEEK_MS)).toISOString(),
      city,
      getRandomItem(mockData.previewImages),
      getRandomItems(mockData.images, 6).join(';'),
      getRandomItem([true, false]),
      getRandomItem([true, false]),
      getRandomFloat(1, 5, 1),
      getRandomItem(mockData.housingTypes),
      getRandomInt(1, 8),
      getRandomInt(1, 10),
      getRandomInt(100, 2000),
      getRandomItems(mockData.goods, getRandomInt(1, mockData.goods.length)).join(';'),
      user.name,
      user.email,
      user.avatarPath,
      password,
      getRandomItem(mockData.userTypes),
      (latitude + getRandomFloat(-0.05, 0.05, 6)).toFixed(6),
      (longitude + getRandomFloat(-0.05, 0.05, 6)).toFixed(6),
    ].join('\t');
  }
}
