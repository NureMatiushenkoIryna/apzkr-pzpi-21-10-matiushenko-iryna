import { Car } from 'src/car/entities/car.entity';
import { BaseEntity } from 'src/entities';
import { Station } from 'src/station/entities/station.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ChargingStatus } from '../enum/chargin-status.enum';
import { Incident } from 'src/incident/entities/incident.entity';
import { DecimalTransformer } from 'src/utils/transformers/decimal.transformer';

@Entity()
export class Charging extends BaseEntity {
  @Column({
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  startPercent: number;

  @Column({
    type: 'decimal',
    nullable: true,
    transformer: new DecimalTransformer(),
  })
  endPercent: number;

  @Column({
    type: 'enum',
    enum: ChargingStatus,
  })
  status: ChargingStatus;

  @Column({
    type: 'timestamptz',
  })
  date: Date;

  @ManyToOne(() => Car, (car) => car.chargings)
  car: Car;

  @ManyToOne(() => Station)
  station: Station;

  @OneToMany(() => Incident, (incident) => incident.charging)
  incidents: Incident[];
}
