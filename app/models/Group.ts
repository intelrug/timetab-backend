import {
  BaseEntity, Column, Entity, If, In, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import LessonEntity from './Lesson';

export interface Group {
  id: number;
  name: string;
}

@Entity('groups')
export default class GroupEntity extends BaseEntity implements Group {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => LessonEntity, (lesson): GroupEntity => lesson.group)
  lessons: LessonEntity[];

  public static async getMany(ids: string = ''): Promise<GroupEntity[]> {
    return GroupEntity.find({
      where: {
        id: If(ids, In(ids.split(','))),
      },
    });
  }

  public static async getOne(id: number): Promise<GroupEntity> {
    return GroupEntity.findOne(id);
  }
}
