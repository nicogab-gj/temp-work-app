import { TempWorker } from 'src/temp-worker/domain/temp-worker';

export abstract class TempWorkerLoader {
  abstract findAll(): Promise<TempWorker[]>;
}
