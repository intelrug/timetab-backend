import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import GroupEntity, { Group } from '../models/Group';

export interface GroupsGetMany {
  groups: Group[],
}

export interface GroupsGetOne {
  group: Group,
}

@Route('groups')
export class Groups extends Controller {
  @Get()
  @OperationId('groupsGetMany')
  public async getMany(
    @Query() ids?: string,
  ): Promise<GroupsGetMany> {
    const groups: GroupEntity[] = await GroupEntity.getMany(ids);
    return { groups };
  }

  @Get('{id}')
  @OperationId('groupsGetOne')
  public async getOne(id: number): Promise<GroupsGetOne> {
    const group: GroupEntity = await GroupEntity.getOne(id);
    return { group };
  }
}
