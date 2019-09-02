import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import ScienceEntity, { Science } from '../models/Science';

export interface SciencesGetMany {
  sciences: Science[],
}

export interface SciencesGetOne {
  science: Science,
}

@Route('sciences')
export class Sciences extends Controller {
  @Get()
  @OperationId('sciencesGetMany')
  public async getMany(
    @Query() ids?: string,
  ): Promise<SciencesGetMany> {
    const sciences: ScienceEntity[] = await ScienceEntity.getMany(ids);
    return { sciences };
  }

  @Get('{id}')
  @OperationId('sciencesGetOne')
  public async getOne(id: number): Promise<SciencesGetOne> {
    const science: ScienceEntity = await ScienceEntity.getOne(id);
    return { science };
  }
}
