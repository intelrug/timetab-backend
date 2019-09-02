import {
  BaseEntity, Column, Entity, If, In, PrimaryGeneratedColumn,
} from 'typeorm';

export interface Teacher {
  id: number;
  name: string;
  link: string;
}

@Entity('teachers')
export default class TeacherEntity extends BaseEntity implements Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  link: string;

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
