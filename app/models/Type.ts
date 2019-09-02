import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

export interface Type {
  id: number;
  name: string;
}

@Entity('types')
export default class TypeEntity extends BaseEntity implements Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
