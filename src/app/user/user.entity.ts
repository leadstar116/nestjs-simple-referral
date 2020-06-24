import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';

@Entity({ name: "users" })
export class User extends BaseEntity{
  @Column({ unique: true })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ length: 100, nullable: true })
  passwordHash: string;

  @Column({ default: 0 })
  referralCount: number;

  @Column({ default: 0 })
  balance: number;

  @Column({ nullable: true })
  referrerId: number;

  @ManyToOne(type => User, user => user.referees)
  @JoinColumn({ name: 'referrer_id' })
  referrer: User | null

  @OneToMany(type => User, user => user.referrer)
  referees: User[];
}
