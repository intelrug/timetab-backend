import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('groups')
export default class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
