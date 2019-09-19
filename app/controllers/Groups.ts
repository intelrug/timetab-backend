import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import GroupEntity, { Group } from '../models/Group';

@Route('groups')
export class Groups extends Controller {
  @Get()
  @OperationId('groupsGetMany')
  public async getMany(
    @Query() ids?: string,
  ): Promise<Group[]> {
    return GroupEntity.getMany(ids);
  }

  @Get('{id}')
  @OperationId('groupsGetById')
  public async getOne(id: number): Promise<Group> {
    return GroupEntity.getOne(id);
  }
}
