import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

export interface Group {
  id: number;
  name: string;
}

@Entity('groups')
export default class GroupEntity extends BaseEntity implements Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}