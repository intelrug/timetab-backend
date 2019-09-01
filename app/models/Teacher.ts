import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers')
export default class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  link: string;
}
