import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { AirportModel } from '../../models/airport.model';
import { AirportRepository } from '../../repositories/airport.repository';

export class GetAirportsUseCase implements UseCase<void, AirportModel[]> {
  constructor(private airportRepository: AirportRepository) {}

  execute(): Observable<AirportModel[]> {
    return this.airportRepository.getAirports();
  }
}
