#!/usr/bin/env node
import { CLIApplication } from './cli/cli-application.js';
import { GenerateCommand } from './cli/commands/generate.command.js';
import { HelpCommand } from './cli/commands/help.command.js';
import { ImportCommand } from './cli/commands/import.command.js';
import { VersionCommand } from './cli/commands/version.command.js';

async function bootstrap() {
  const app = new CLIApplication();
  app.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  await app.processCommand(process.argv);
}

bootstrap();
