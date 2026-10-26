import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import chalk from 'chalk';
import got from 'got';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from '../offer-generator.js';
import { TSVFileWriter } from '../tsv-file-writer.js';
import { Command } from './command.interface.js';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    if (!Number.isInteger(offerCount) || offerCount <= 0 || !filepath || !url) {
      console.error(chalk.red('Использование: --generate <n> <filepath> <url>'));
      return;
    }

    try {
      const mockData = await got.get(url).json<MockServerData>();
      const generator = new OfferGenerator(mockData);

      mkdirSync(dirname(filepath), { recursive: true });
      const writer = new TSVFileWriter(filepath);

      for (let i = 0; i < offerCount; i++) {
        await writer.write(generator.generate());
      }
      await writer.close();

      console.info(chalk.green(`Файл ${filepath} создан, предложений: ${offerCount}`));
    } catch (error) {
      console.error(chalk.red(`Не удалось сгенерировать данные (${url})`));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
