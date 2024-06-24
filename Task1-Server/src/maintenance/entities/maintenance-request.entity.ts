import { BaseEntity } from 'src/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { MaintenanceStatus } from '../enums/maintenance-status.enum';
import { Car } from 'src/car/entities/car.entity';
import { Station } from 'src/station/entities/station.entity';
import { DecimalTransformer } from 'src/utils/transformers/decimal.transformer';

@Entity()
export class MaintenanceRequest extends BaseEntity {
  @Column({
    type: 'enum',
    enum: MaintenanceStatus,
  })
  status: MaintenanceStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  rejectionReason: string;

  @Column({
    type: 'timestamptz',
  })
  completeBy: Date;

  @Column({
    nullable: true,
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  price: number;

  @ManyToOne(() => Car, (car) => car.maintenanceRequests)
  car: Car;

  @ManyToOne(() => Station, (station) => station.maintenanceRequests)
  station: Station;
}
