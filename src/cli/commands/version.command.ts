import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';
import { Command } from './command.interface.js';

export class VersionCommand implements Command {
  constructor(private readonly filePath = './package.json') {}

  public getName() {
    return '--version';
  }

  public execute(): void {
    try {
      const { version } = JSON.parse(readFileSync(resolve(this.filePath), 'utf-8'));
      console.info(chalk.green(version));
    } catch (error) {
      console.error(chalk.red(`Не удалось прочитать версию из ${this.filePath}`));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
