import { Exclude } from 'class-transformer';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { Car } from 'src/car/entities/car.entity';
import { BaseEntity } from 'src/entities';
import { Station } from 'src/station/entities/station.entity';
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  RelationId,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({
    type: 'date',
  })
  dateOfBirth: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Customer,
  })
  role: UserRole;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  refreshToken: string;

  @CreateDateColumn()
  registratonDate: Date;

  @OneToMany(() => Car, (car) => car.owner)
  cars: Car[];

  @ManyToOne(() => Station, {
    nullable: true,
  })
  @JoinColumn()
  station?: Station;

  @Column({
    nullable: true,
  })
  @RelationId((user: User) => user.station)
  stationId?: string;
}
