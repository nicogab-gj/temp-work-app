import * as request from 'supertest';

import { Test } from '@nestjs/testing';
import { TempWorkerStore } from '../../application/interfaces/temp-worker.store';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';
import { TempWorkerLoader } from '../../application/interfaces/temp-worker.loader';
import { InMemTempWorkerStore } from '../stores/temp-worker.in-mem.store';
import { InMemTempWorkerLoader } from '../loaders/temp-worker.in-mem.loader';
import { InMemDatabase } from '../in-mem.database';

describe('WorkerController', () => {
  let store: InMemTempWorkerStore;
  let loader: InMemTempWorkerLoader;
  let db: InMemDatabase;
  let app: INestApplication;

  beforeEach(async () => {
    db = new InMemDatabase();
    store = new InMemTempWorkerStore(db);
    loader = new InMemTempWorkerLoader(db);

    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TempWorkerStore)
      .useValue(store)
      .overrideProvider(TempWorkerLoader)
      .useValue(loader)
      .compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  describe('register', () => {
    it('should create a temp worker', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/temp-worker')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example',
        });

      const workers = await loader.findAll();

      expect(workers).toEqual([
        {
          id: expect.any(String),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example',
        },
      ]);
      expect(body).toEqual({
        success: true,
      });
    });
  });

  describe('retrieve', () => {
    it('should retrieve the list of workers', async () => {
      await loader.feed({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example',
      });

      const response = await request(app.getHttpServer()).get('/temp-worker');

      expect(response.body).toEqual([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example',
        },
      ]);
    });
  });
});
