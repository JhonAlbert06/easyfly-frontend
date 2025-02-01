import { Injectable } from '@angular/core';
import { AirportRepository } from '../../domain/repositories/airport.repository';
import { map, Observable } from 'rxjs';
import { AirportModel } from '../../domain/models/airport.model';
import { environment } from '../../enviroments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AirportImplementationRepository extends AirportRepository {
  private URL = environment.URL;

  constructor(private http: HttpClient) {
    super();
  }

  getAirports(): Observable<AirportModel[]> {
    return this.http.get<AirportModel[]>(`${this.URL}/airports`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
