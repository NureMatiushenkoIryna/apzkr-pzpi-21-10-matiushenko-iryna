import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { ChargingModule } from './charging/charging.module';
import { IncidentModule } from './incident/incident.module';
import { StationModule } from './station/station.module';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRequestModule } from './maintenance/maintenance-request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,

      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    CarModule,
    ChargingModule,
    IncidentModule,
    StationModule,
    MaintenanceRequestModule,
  ],
})
export class AppModule {}
