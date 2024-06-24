import { BaseEntity } from 'src/entities';
import { MaintenanceRequest } from 'src/maintenance/entities/maintenance-request.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Station extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => MaintenanceRequest, request => request.station)
  maintenanceRequests: MaintenanceRequest[]
}
