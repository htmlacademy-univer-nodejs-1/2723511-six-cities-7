import { Command } from './commands/command.interface.js';

type ParsedCommand = Record<string, string[]>;

export class CLIApplication {
  private commands: Record<string, Command> = {};

  constructor(private readonly defaultCommand = '--help') {}

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      this.commands[command.getName()] = command;
    });
  }

  private parseCommand(argv: string[]): ParsedCommand {
    const parsed: ParsedCommand = {};
    let current = '';
    for (const arg of argv) {
      if (arg.startsWith('--')) {
        current = arg;
        parsed[current] = [];
      } else if (current) {
        parsed[current].push(arg);
      }
    }
    return parsed;
  }

  public async processCommand(argv: string[]): Promise<void> {
    const parsed = this.parseCommand(argv);
    const [name = this.defaultCommand] = Object.keys(parsed);
    const command = this.commands[name] ?? this.commands[this.defaultCommand];
    await command.execute(...(parsed[name] ?? []));
  }
}
