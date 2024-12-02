import { Injectable } from '@nestjs/common';
import { TempWorker } from '../../domain/temp-worker';
import { TempWorkerLoader } from '../interfaces/temp-worker.loader';

@Injectable()
export class RetrieveTempWorkerListQueryHandler {
  constructor(private readonly tempWorkerLoader: TempWorkerLoader) {}

  async execute(): Promise<TempWorker[]> {
    return this.tempWorkerLoader.findAll();
  }
}
