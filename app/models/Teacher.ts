import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
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
}
