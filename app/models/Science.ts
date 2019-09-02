import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

export interface Science {
  id: number;
  name: string;
}

@Entity('sciences')
export default class ScienceEntity extends BaseEntity implements Science {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
