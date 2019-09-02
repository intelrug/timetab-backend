import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import TypeEntity, { Type } from '../models/Type';

export interface TypesGetMany {
  types: Type[],
}

export interface TypesGetOne {
  type: Type,
}

@Route('types')
export class Types extends Controller {
  @Get()
  @OperationId('typesGetMany')
  public async getMany(
    @Query() ids?: string,
  ): Promise<TypesGetMany> {
    const types: TypeEntity[] = await TypeEntity.getMany(ids);
    return { types };
  }

  @Get('{id}')
  @OperationId('typesGetOne')
  public async getOne(id: number): Promise<TypesGetOne> {
    const type: TypeEntity = await TypeEntity.getOne(id);
    return { type };
  }
}
