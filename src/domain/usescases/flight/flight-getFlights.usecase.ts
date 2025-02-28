import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { FlightModel } from '../../models/flight.model';
import { FlightRepository } from '../../repositories/flight.repository';

export class GetFlightsUseCase implements UseCase<void, FlightModel[]> {
  constructor(private flightRepository: FlightRepository) {}

  execute(): Observable<FlightModel[]> {
    return this.flightRepository.getFlights();
  }
}
