import { InMemDatabase } from '../../infrastructure/in-mem.database';
import { InMemTempWorkerStore } from '../../infrastructure/stores/temp-worker.in-mem.store';
import {
  RegisterTempWorkerCommand,
  RegisterTempWorkerCommandHandler,
} from './register-temp-worker.command';

describe('RegisterTempWorkerCommand', () => {
  let store: InMemTempWorkerStore;
  let inMemDatabase: InMemDatabase;

  beforeEach(() => {
    inMemDatabase = new InMemDatabase();
    store = new InMemTempWorkerStore(inMemDatabase);
  });

  it('should create a temp worker', () => {
    const command = new RegisterTempWorkerCommand(
      'John',
      'Doe',
      'john.doe@example',
    );
    const handler = new RegisterTempWorkerCommandHandler(store);

    handler.execute(command);

    expect(inMemDatabase.tempWorkers).toEqual([
      {
        id: expect.any(String),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example',
      },
    ]);
  });
});
