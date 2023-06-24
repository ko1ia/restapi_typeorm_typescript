import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm'

import { User } from './User'

@Entity()
export class Token extends BaseEntity {

  @PrimaryGeneratedColumn()
    id: number

  @Column()
    token: string

  @OneToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
    user: User

}
