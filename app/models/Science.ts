import {
  BaseEntity, Column, Entity, If, In, PrimaryGeneratedColumn,
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

  public static async getMany(ids: string = ''): Promise<ScienceEntity[]> {
    return ScienceEntity.find({
      where: {
        id: If(ids, In(ids.split(','))),
      },
    });
  }

  public static async getOne(id: number): Promise<ScienceEntity> {
    return ScienceEntity.findOne(id);
  }
}
