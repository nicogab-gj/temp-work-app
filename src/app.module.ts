import { Module } from '@nestjs/common';
import { TempWorkerModule } from './temp-worker/temp-worker.module';

@Module({
  imports: [TempWorkerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
