import { TempWorker } from 'src/temp-worker/domain/temp-worker';

export abstract class TempWorkerStore {
  abstract save(tempWorker: TempWorker): Promise<void>;
}
