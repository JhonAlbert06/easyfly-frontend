import { NgModule } from '@angular/core';
import { AirportImplementationRepository } from '../../../data/repositories/airport.implementation.repository';
import { AirportRepository } from '../../repositories/airport.repository';
import { GetAirportsUseCase } from './airport-getAirports.usecase';

const getAirportsUseCaseFactory = (airportRepository: AirportRepository) =>
  new GetAirportsUseCase(airportRepository);
export const GetAirportsUseCaseProvider = {
  provide: GetAirportsUseCase,
  useFactory: getAirportsUseCaseFactory,
  deps: [AirportRepository],
};

@NgModule({
  providers: [
    GetAirportsUseCaseProvider,
    {
      provide: AirportRepository,
      useClass: AirportImplementationRepository,
    },
  ],
})
export class AirportDataModule {}
