import { Observable } from 'rxjs';
import { FlightModel } from '../models/flight.model';

export abstract class FlightRepository {
  abstract getFlights(): Observable<FlightModel[]>;
}
