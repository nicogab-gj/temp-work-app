import { TempWorker } from '../../domain/temp-worker';
import { InMemDatabase } from '../../infrastructure/in-mem.database';
import { InMemTempWorkerLoader } from '../../infrastructure/loaders/temp-worker.in-mem.loader';
import { RetrieveTempWorkerListQueryHandler } from './retrieve-temp-worker-list.query';

describe('RetrieveTempWorkerListQuery', () => {
  const worker1: TempWorker = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example',
  };

  const worker2: TempWorker = {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example',
  };

  let loader: InMemTempWorkerLoader;
  let queryHandler: RetrieveTempWorkerListQueryHandler;
  let inMemDatabase: InMemDatabase;

  beforeEach(async () => {
    inMemDatabase = new InMemDatabase();
    loader = new InMemTempWorkerLoader(inMemDatabase);
    queryHandler = new RetrieveTempWorkerListQueryHandler(loader);
  });

  it('should retrieve the list of workers', async () => {
    await loader.feed(worker1);
    await loader.feed(worker2);

    const result = await queryHandler.execute();
    expect(result).toEqual([worker1, worker2]);
  });
});
