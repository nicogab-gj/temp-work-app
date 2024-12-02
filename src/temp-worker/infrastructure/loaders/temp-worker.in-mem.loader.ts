import { Injectable } from '@nestjs/common';
import { TempWorker } from 'src/temp-worker/domain/temp-worker';
import { TempWorkerLoader } from '../../application/interfaces/temp-worker.loader';
import { InMemDatabase } from '../in-mem.database';

@Injectable()
export class InMemTempWorkerLoader implements TempWorkerLoader {
  constructor(public inMemDatabase: InMemDatabase) {}

  async feed(tempWorker: TempWorker) {
    this.inMemDatabase.tempWorkers.push(tempWorker);
  }

  async findAll(): Promise<TempWorker[]> {
    return this.inMemDatabase.tempWorkers;
  }
}
