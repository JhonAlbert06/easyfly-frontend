import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FlightModel } from '../../domain/models/flight.model';
import { FlightRepository } from '../../domain/repositories/flight.repository';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightImplementationRepository extends FlightRepository {
  private URL = environment.URL;

  constructor(private http: HttpClient) {
    super();
  }

  getFlights(): Observable<FlightModel[]> {
    return this.http.get<FlightModel[]>(`${this.URL}/flights`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
