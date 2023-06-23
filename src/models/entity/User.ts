import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from 'typeorm'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
    id: number

  @Column()
    email: string

  @Column()
    password: string

  @Column('boolean', { default: false })
    isActive: boolean

  @Column()
  @Generated('uuid')
    uuid: string

}
