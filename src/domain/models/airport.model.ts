export interface AirportModel {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
}

export class Airport implements AirportModel {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.code = '';
    this.city = '';
    this.country = '';
  }
}
