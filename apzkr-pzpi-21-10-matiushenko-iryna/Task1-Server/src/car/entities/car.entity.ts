import { Charging } from 'src/charging/entities/charging.entity';
import { BaseEntity } from 'src/entities';
import { MaintenanceRequest } from 'src/maintenance/entities/maintenance-request.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Car extends BaseEntity {
  @ManyToOne(() => User, (user) => user.cars)
  owner: User;

  @Column()
  model: string;

  @Column({
    default: false,
  })
  active: boolean;

  @OneToMany(() => Charging, (charging) => charging.car)
  chargings: Charging[];

  @OneToMany(() => MaintenanceRequest, (request) => request.car)
  maintenanceRequests: MaintenanceRequest[];
}
