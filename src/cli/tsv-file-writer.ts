import { once } from 'node:events';
import { createWriteStream, WriteStream } from 'node:fs';

export class TSVFileWriter {
  private readonly stream: WriteStream;
  private error?: Error;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, { flags: 'w', encoding: 'utf-8' });
    this.stream.on('error', (error) => {
      this.error = error;
    });
  }

  public async write(row: string): Promise<void> {
    if (this.error) {
      throw this.error;
    }
    if (!this.stream.write(`${row}\n`)) {
      await once(this.stream, 'drain');
    }
  }

  public async close(): Promise<void> {
    this.stream.end();
    await once(this.stream, 'finish');
    if (this.error) {
      throw this.error;
    }
  }
}
