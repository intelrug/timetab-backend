import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sciences')
export default class Science {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
