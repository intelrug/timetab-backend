import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import TypeEntity, { Type } from '../models/Type';

@Route('types')
export class Types extends Controller {
  @Get()
  @OperationId('typesGetMany')
  public async getMany(
    @Query() ids?: string,
  ): Promise<Type[]> {
    return TypeEntity.getMany(ids);
  }

  @Get('{id}')
  @OperationId('typesGetOne')
  public async getOne(id: number): Promise<Type> {
    return TypeEntity.getOne(id);
  }
}
