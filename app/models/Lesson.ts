import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn, If, In,
} from 'typeorm';

@Entity('lessons')
export default class Lesson extends BaseEntity {
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

  public static async getMany(
    ids: string = '',
    groupIds: string = '',
    typeIds: string = '',
    weeks: string = '',
    days: string = '',
    teacherIds: string = '',
    scienceIds: string = '',
  ): Promise<Lesson[]> {
    return Lesson.find({
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
  }
}
