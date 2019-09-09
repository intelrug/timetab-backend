import {
  BaseEntity, Column, Entity, If, In, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import LessonEntity from './Lesson';

export interface Science {
  id: number;
  name: string;
}

@Entity('sciences')
export default class ScienceEntity extends BaseEntity implements Science {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => LessonEntity, (lesson): ScienceEntity => lesson.science)
  lessons: LessonEntity[];

  public static async getMany(ids: string = ''): Promise<ScienceEntity[]> {
    return ScienceEntity.find({
      where: {
        id: If(ids, In(ids.split(','))),
      },
    });
  }

  public static async getOne(id: number): Promise<ScienceEntity> {
    return ScienceEntity.findOne(id);
  }
}
