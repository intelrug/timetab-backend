import {
  BaseEntity, Column, Entity, If, In, PrimaryGeneratedColumn,
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

  public static async getMany(ids: string = ''): Promise<GroupEntity[]> {
    return GroupEntity.find({
      where: {
        id: If(ids, In(ids.split(','))),
      },
    });
  }

  public static async getOne(id: number): Promise<GroupEntity> {
    return GroupEntity.findOne(id);
  }
}
