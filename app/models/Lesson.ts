import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn, If, In, getManager,
} from 'typeorm';
import GroupEntity from './Group';
import TeacherEntity from './Teacher';
import ScienceEntity from './Science';
import TypeEntity from './Type';

export interface Lesson {
  id: number;
  group_id: number;
  type_id: number;
  week: number;
  day: number;
  number: number;
  count: number;
  teacher_id: number;
  science_id: number;
  auditory: string;
  subgroup: number;
  notes: string
}

@Entity('lessons')
export default class LessonEntity extends BaseEntity implements Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true })
  group_id: number;

  @Column({
    type: 'int', unsigned: true, nullable: true, default: null,
  })
  type_id: number;

  @Column({ type: 'tinyint', unsigned: true })
  week: number;

  @Column({ type: 'tinyint', unsigned: true })
  day: number;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  number: number;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  count: number;

  @Column({
    type: 'int', unsigned: true, nullable: true, default: null,
  })
  teacher_id: number;

  @Column({ type: 'int', unsigned: true })
  science_id: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  auditory: string;

  @Column({
    type: 'tinyint', unsigned: true, nullable: true, default: null,
  })
  subgroup: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  notes: string;

  public static async getMany(
    ids: string = '',
    groupIds: string = '',
    typeIds: string = '',
    weeks: string = '',
    days: string = '',
    teacherIds: string = '',
    scienceIds: string = '',
  ): Promise<{
      lessons: Lesson[],
      groups: GroupEntity[],
      teachers: TeacherEntity[],
      sciences: ScienceEntity[],
      types: TypeEntity[]
    }> {
    const lessons: Lesson[] = await LessonEntity.find({
      where: {
        id: If(ids, In(ids.split(','))),
        group_id: If(groupIds, In(groupIds.split(','))),
        type_id: If(typeIds, In(typeIds.split(','))),
        week: If(weeks, In(weeks.split(','))),
        day: If(days, In(days.split(','))),
        teacher_id: If(teacherIds, In(teacherIds.split(','))),
        science_id: If(scienceIds, In(scienceIds.split(','))),
      },
    });

    const groupIdsAll: number[] = [];
    const teacherIdsAll: number[] = [];
    const scienceIdsAll: number[] = [];
    const typeIdsAll: number[] = [];

    let groups: GroupEntity[] = [];
    let teachers: TeacherEntity[] = [];
    let sciences: ScienceEntity[] = [];
    let types: TypeEntity[] = [];

    lessons.forEach(lesson => {
      groupIdsAll.push(lesson.group_id);
      if (lesson.teacher_id) teacherIdsAll.push(lesson.teacher_id);
      if (lesson.science_id) scienceIdsAll.push(lesson.science_id);
      if (lesson.type_id) typeIdsAll.push(lesson.type_id);
    });

    await getManager().transaction(async tem => {
      if (groupIdsAll.length > 0) {
        groups = await tem.find(GroupEntity, { where: { id: In(groupIdsAll) } });
      }
      if (teacherIdsAll.length > 0) {
        teachers = await tem.find(TeacherEntity, { where: { id: In(teacherIdsAll) } });
      }
      if (scienceIdsAll.length > 0) {
        sciences = await tem.find(ScienceEntity, { where: { id: In(scienceIdsAll) } });
      }
      if (typeIdsAll.length > 0) {
        types = await tem.find(TypeEntity, { where: { id: In(typeIdsAll) } });
      }
    });

    return {
      lessons, groups, teachers, sciences, types,
    };
  }

  public static async getOne(id: number): Promise<{
    lesson: Lesson,
    groups: GroupEntity[],
    teachers: TeacherEntity[],
    sciences: ScienceEntity[],
    types: TypeEntity[]
  }> {
    const lesson: LessonEntity = await LessonEntity.findOne(id);

    const groups: GroupEntity[] = [];
    const teachers: TeacherEntity[] = [];
    const sciences: ScienceEntity[] = [];
    const types: TypeEntity[] = [];

    await getManager().transaction(async tem => {
      groups.push(await tem.findOne(GroupEntity, lesson.group_id));
      sciences.push(await tem.findOne(ScienceEntity, lesson.science_id));
      if (lesson.teacher_id) {
        teachers.push(await tem.findOne(TeacherEntity, lesson.teacher_id));
      }
      if (lesson.type_id) {
        types.push(await tem.findOne(TypeEntity, lesson.type_id));
      }
    });

    return {
      lesson, groups, teachers, sciences, types,
    };
  }
}
