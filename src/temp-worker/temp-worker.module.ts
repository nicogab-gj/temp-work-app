import { Module } from '@nestjs/common';
import { TempWorkerController } from './infrastructure/web/worker.controller';
import { TempWorkerStore } from './application/interfaces/temp-worker.store';
import { RegisterTempWorkerCommandHandler } from './application/commands/register-temp-worker.command';
import { RetrieveTempWorkerListQueryHandler } from './application/queries/retrieve-temp-worker-list.query';
import { InMemTempWorkerStore } from './infrastructure/stores/temp-worker.in-mem.store';
import { TempWorkerLoader } from './application/interfaces/temp-worker.loader';
import { InMemDatabase } from './infrastructure/in-mem.database';

@Module({
  imports: [],
  controllers: [TempWorkerController],
  providers: [
    InMemDatabase,
    { provide: TempWorkerStore, useClass: InMemTempWorkerStore },
    { provide: TempWorkerLoader, useClass: InMemTempWorkerStore },
    RegisterTempWorkerCommandHandler,
    RetrieveTempWorkerListQueryHandler,
  ],
})
export class TempWorkerModule {}
