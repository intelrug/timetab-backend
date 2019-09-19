import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import ScienceEntity, { Science } from '../models/Science';

@Route('sciences')
export class Sciences extends Controller {
  @Get()
  @OperationId('sciencesGetMany')
  public async getMany(
    @Query() ids?: string,
  ): Promise<Science[]> {
    return ScienceEntity.getMany(ids);
  }

  @Get('{id}')
  @OperationId('sciencesGetById')
  public async getOne(id: number): Promise<Science> {
    return ScienceEntity.getOne(id);
  }
}
