import { readFileSync } from 'node:fs';
import chalk from 'chalk';
import { Command } from './command.interface.js';
import { Offer, City, HousingType, Good, UserType } from '../../types/offer.type.js';

function parseOffer(line: string): Offer {
  const [
    title, description, publishDate, city, previewImage, images,
    isPremium, isFavorite, rating, type, rooms, guests, price, goods,
    userName, email, avatarPath, password, userType, latitude, longitude,
  ] = line.split('\t');

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

export class ImportCommand implements Command {
  public getName() {
    return '--import';
  }

  public execute(filename?: string): void {
    if (!filename) {
      console.error(chalk.red('Укажите путь к файлу: --import <path>'));
      return;
    }
    try {
      const offers = readFileSync(filename, 'utf-8')
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map(parseOffer);

      offers.forEach((offer) => console.info(offer));
      console.info(chalk.green(`Импортировано предложений: ${offers.length}`));
    } catch (error) {
      console.error(chalk.red(`Не удалось импортировать данные из файла ${filename}`));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
