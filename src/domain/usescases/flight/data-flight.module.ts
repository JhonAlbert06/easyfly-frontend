import { NgModule } from '@angular/core';
import { FlightRepository } from '../../repositories/flight.repository';
import { GetFlightsUseCase } from './flight-getFlights.usecase';
import { FlightImplementationRepository } from '../../../data/repositories/flight.implementation.repository';

const getFlightsUseCaseFactory = (flightRepository: FlightRepository) =>
  new GetFlightsUseCase(flightRepository);
export const GetFlightsUseCaseProvider = {
  provide: GetFlightsUseCase,
  useFactory: getFlightsUseCaseFactory,
  deps: [FlightRepository],
};

@NgModule({
  providers: [
    GetFlightsUseCaseProvider,
    {
      provide: FlightRepository,
      useClass: FlightImplementationRepository,
    },
  ],
})
export class FlightDataModule {}
