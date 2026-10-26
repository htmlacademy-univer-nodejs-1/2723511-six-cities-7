import { OFFER_FIELDS_COUNT } from '../const.js';
import { City, Good, HousingType, Offer, UserType } from '../types/offer.type.js';

export function createOffer(line: string, lineNumber: number): Offer {
  const fields = line.split('\t');
  if (fields.length !== OFFER_FIELDS_COUNT) {
    throw new Error(`Строка ${lineNumber}: ожидается ${OFFER_FIELDS_COUNT} поле, найдено ${fields.length}. Поля должны быть разделены табуляцией.`);
  }

  const [
    title, description, publishDate, city, previewImage, images,
    isPremium, isFavorite, rating, type, rooms, guests, price, goods,
    userName, email, avatarPath, password, userType, latitude, longitude,
  ] = fields;

  return {
    title,
    description,
    publishDate: new Date(publishDate),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    type: type as HousingType,
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';') as Good[],
    author: { name: userName, email, avatarPath, password, type: userType as UserType },
    commentsCount: 0,
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };
}
