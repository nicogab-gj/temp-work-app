import { TempWorker } from 'src/temp-worker/domain/temp-worker';
import { TempWorkerStore } from '../interfaces/temp-worker.store';

import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';

export class RegisterTempWorkerCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
  ) {}
}

@Injectable()
export class RegisterTempWorkerCommandHandler {
  constructor(private readonly tempWorkerRepository: TempWorkerStore) {}

  async execute({ firstName, lastName, email }: RegisterTempWorkerCommand) {
    const tempWorker: TempWorker = {
      id: v4(),
      firstName,
      lastName,
      email,
    };

    await this.tempWorkerRepository.save(tempWorker);
  }
}
