import { Module } from '@nestjs/common';
import { AirportController } from './controllers/Airport/Airport.controller';

@Module({
  controllers: [
    AirportController
  ]
})
export class ApplicationModule { }