import {
  Controller, Get, OperationId, Query, Route,
} from 'tsoa';
import LessonEntity, { Lesson } from '../models/Lesson';
import { Group } from '../models/Group';
import { Teacher } from '../models/Teacher';
import { Science } from '../models/Science';
import { Type } from '../models/Type';

export interface LessonsGetMany {
  lessons: Lesson[],
  groups: Group[],
  teachers: Teacher[],
  sciences: Science[],
  types: Type[],
}

@Route('lessons')
export class Lessons extends Controller {
  @Get()
  @OperationId('lessonsGetMany')
  public async getMany(
    @Query() ids?: string,
    @Query() group_ids?: string,
    @Query() type_ids?: string,
    @Query() weeks?: string,
    @Query() days?: string,
    @Query() teacher_ids?: string,
    @Query() science_ids?: string,
  ): Promise<LessonsGetMany> {
    return LessonEntity.getMany(ids, group_ids, type_ids, weeks, days, teacher_ids, science_ids);
  }
}
