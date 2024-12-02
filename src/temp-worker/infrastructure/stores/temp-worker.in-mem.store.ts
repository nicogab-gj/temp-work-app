import { Injectable } from '@nestjs/common';
import { TempWorker } from 'src/temp-worker/domain/temp-worker';
import { TempWorkerStore } from '../../application/interfaces/temp-worker.store';
import { InMemDatabase } from '../in-mem.database';

@Injectable()
export class InMemTempWorkerStore implements TempWorkerStore {
  constructor(private readonly inMemDatabase: InMemDatabase) {}

  async save(tempWorker: TempWorker) {
    this.inMemDatabase.tempWorkers.push(tempWorker);
  }
}
