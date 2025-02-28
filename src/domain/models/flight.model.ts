import { Airport, AirportModel } from './airport.model';

export interface FlightModel {
  id: string;
  airline: string;
  flight_number: string;
  airport_origin: AirportModel;
  airport_destination: AirportModel;
  departure_time: string;
  arrival_time: string;
  price: number;
  seats_total: number;
  seats_booked: number;
  seats_available: number;
  status: string;
}

export class Flight implements FlightModel {
  id: string;
  airline: string;
  flight_number: string;
  airport_origin: Airport;
  airport_destination: Airport;
  departure_time: string;
  arrival_time: string;
  price: number;
  seats_total: number;
  seats_booked: number;
  seats_available: number;
  status: string;

  constructor() {
    this.id = '';
    this.airline = '';
    this.flight_number = '';
    this.airport_origin = {} as Airport;
    this.airport_destination = {} as Airport;
    this.departure_time = '';
    this.arrival_time = '';
    this.price = 0;
    this.seats_total = 0;
    this.seats_booked = 0;
    this.seats_available = 0;
    this.status = '';
  }
}
