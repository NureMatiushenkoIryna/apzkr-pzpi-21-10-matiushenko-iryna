import { Charging } from 'src/charging/entities/charging.entity';
import { BaseEntity } from 'src/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IncidentType } from '../enums/incident-type.enum';
import { DecimalTransformer } from 'src/utils/transformers/decimal.transformer';

@Entity()
export class Incident extends BaseEntity {
  @Column({
    type: 'timestamptz',
  })
  date: Date;

  @Column({
    type: 'enum',
    enum: IncidentType,
  })
  type: IncidentType;

  @Column({
    nullable: true,
    type: "decimal",
    transformer: new DecimalTransformer()
  })
  abnormalValue?: number;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Charging, (charging) => charging)
  charging: Charging;
}
