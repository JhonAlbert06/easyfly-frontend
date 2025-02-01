import { Observable } from 'rxjs';
import { AirportModel } from '../models/airport.model';

export abstract class AirportRepository {
  abstract getAirports(): Observable<AirportModel[]>;
}
