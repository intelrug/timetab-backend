import {
  BaseEntity, Column, Entity, If, In, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import LessonEntity from './Lesson';

export interface Teacher {
  id: number;
  name: string;
  link: string;
}

@Entity('teachers')
export default class TeacherEntity extends BaseEntity implements Teacher {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  link: string;

  @OneToMany(() => LessonEntity, (lesson): TeacherEntity => lesson.teacher)
  lessons: LessonEntity[];

  public static async getMany(ids: string = ''): Promise<TeacherEntity[]> {
    return TeacherEntity.find({
      where: {
        id: If(ids, In(ids.split(','))),
      },
    });
  }

  public static async getOne(id: number): Promise<TeacherEntity> {
    return TeacherEntity.findOne(id);
  }
}
