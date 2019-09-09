import {
  BaseEntity, Column, Entity, If, In, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import LessonEntity from "./Lesson";

export interface Type {
  id: number;
  name: string;
}

@Entity('types')
export default class TypeEntity extends BaseEntity implements Type {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => LessonEntity, (lesson): TypeEntity => lesson.type)
  lessons: LessonEntity[];

  public static async getMany(ids: string = ''): Promise<TypeEntity[]> {
    return TypeEntity.find({
      where: {
        id: If(ids, In(ids.split(','))),
      },
    });
  }

  public static async getOne(id: number): Promise<TypeEntity> {
    return TypeEntity.findOne(id);
  }
}
