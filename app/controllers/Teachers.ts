import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import TeacherEntity, { Teacher } from '../models/Teacher';

@Route('teachers')
export class Teachers extends Controller {
  @Get()
  @OperationId('teachersGetMany')
  public async getMany(
    @Query() ids?: string,
  ): Promise<Teacher[]> {
    return TeacherEntity.getMany(ids);
  }

  @Get('{id}')
  @OperationId('teachersGetById')
  public async getOne(id: number): Promise<Teacher> {
    return TeacherEntity.getOne(id);
  }
}
