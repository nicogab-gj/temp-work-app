import { Injectable } from '@nestjs/common';
import { TempWorker } from '../domain/temp-worker';

@Injectable()
export class InMemDatabase {
  tempWorkers: TempWorker[] = [];
}
