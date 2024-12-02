import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  RegisterTempWorkerCommand,
  RegisterTempWorkerCommandHandler,
} from '../../application/commands/register-temp-worker.command';
import { RetrieveTempWorkerListQueryHandler } from '../../application/queries/retrieve-temp-worker-list.query';
import { TempWorker } from '../../domain/temp-worker';

type createWorkerDto = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Result = {
  success: boolean;
};

@Controller('temp-worker')
export class TempWorkerController {
  constructor(
    private readonly commandHandler: RegisterTempWorkerCommandHandler,
    private readonly queryHandler: RetrieveTempWorkerListQueryHandler,
  ) {}

  @Post()
  async createWorker(
    @Body() createWorkerInput: createWorkerDto,
  ): Promise<Result> {
    const command = new RegisterTempWorkerCommand(
      createWorkerInput.firstName,
      createWorkerInput.lastName,
      createWorkerInput.email,
    );
    await this.commandHandler.execute(command);
    return {
      success: true,
    };
  }

  @Get()
  async retrieveWorkers(): Promise<TempWorker[]> {
    return this.queryHandler.execute();
  }
}
