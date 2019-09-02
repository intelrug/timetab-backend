import {
  BaseEntity, Column, Entity, If, In, PrimaryGeneratedColumn,
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
