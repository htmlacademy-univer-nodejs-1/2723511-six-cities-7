import { open } from 'node:fs/promises';
import chalk from 'chalk';
import { createOffer } from '../../helpers/offer.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(filename?: string): Promise<void> {
    if (!filename) {
      console.error(chalk.red('Укажите путь к файлу: --import <path>'));
      return;
    }

    let lineNumber = 0;
    let count = 0;

    try {
      const file = await open(filename);

      for await (const line of file.readLines()) {
        lineNumber++;
        if (line.trim() === '') {
          continue;
        }
        const offer = createOffer(line, lineNumber);
        count++;
        console.info(chalk.gray(`#${count}`), offer.title, chalk.cyan(offer.city));
      }

      console.info(chalk.green(`Импортировано предложений: ${count}`));
    } catch (error) {
      console.error(chalk.red(`Не удалось импортировать данные из файла ${filename}`));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
