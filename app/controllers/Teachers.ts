import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import TeacherEntity, { Teacher } from '../models/Teacher';

export interface TeachersGetMany {
  teachers: Teacher[],
}

export interface TeachersGetOne {
  teacher: Teacher,
}

@Route('teachers')
export class Teachers extends Controller {
  @Get()
  @OperationId('teachersGetMany')
  public async getMany(
    @Query() ids?: string,
  ): Promise<TeachersGetMany> {
    const teachers: TeacherEntity[] = await TeacherEntity.getMany(ids);
    return { teachers };
  }

  @Get('{id}')
  @OperationId('teachersGetOne')
  public async getOne(id: number): Promise<TeachersGetOne> {
    const teacher: TeacherEntity = await TeacherEntity.getOne(id);
    return { teacher };
  }
}
