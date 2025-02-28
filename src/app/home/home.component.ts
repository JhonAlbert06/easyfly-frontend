import { ChangeDetectorRef, Component } from '@angular/core';
import { GetAirportsUseCase } from '../../domain/usescases/airport/airport-getAirports.usecase';
import { AirportModel } from '../../domain/models/airport.model';
import { GetFlightsUseCase } from '../../domain/usescases/flight/flight-getFlights.usecase';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchTerm: string = '';
  airportList: AirportModel[] = [];
  isLoadingAirports = true;

  origin: AirportModel | null = null;
  destination: AirportModel | null = null;

  departureDate: Date = new Date();
  returnDate: Date = new Date();

  passengers = {
    adult: 1,
    child: 0,
    infant: 0,
  };

  isDropdownOpen = false;

  promoCode: string = '';
  constructor(
    private GetFlights: GetFlightsUseCase,
    private GetAirport: GetAirportsUseCase,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getAirports();
    this.getFlights();
  }

  getFlights() {
    this.GetFlights.execute().subscribe({
      next: (flights) => {
        console.log(flights);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAirports() {
    this.GetAirport.execute().subscribe({
      next: (airports) => {
        this.airportList = airports;
        this.isLoadingAirports = false;
        console.log(this.airportList);
      },
      error: (error) => {
        console.log(error);
        this.isLoadingAirports = false;
      },
    });
  }

  filteredAirports() {
    const term = this.searchTerm.toLowerCase();
    return this.airportList.filter(
      (item) =>
        item.code.toLowerCase().includes(term) ||
        item.city.toLowerCase().includes(term) ||
        item.country.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term)
    );
  }

  selectOrigin(airport: AirportModel, event: Event): void {
    event.preventDefault();
    this.origin = airport;
    console.log('Origen seleccionado:', this.origin);

    setTimeout(() => {
      this.cdr.detectChanges();

      // Cierra el dropdown manualmente
      const dropdownElement = document.querySelector(
        '.dropdown-menu.show'
      ) as HTMLElement;
      if (dropdownElement) {
        dropdownElement.classList.remove('show');
      }
    }, 0);
  }

  selectDestination(airport: AirportModel, event: Event): void {
    event.preventDefault();
    this.destination = airport;
    console.log('Destino seleccionado:', this.destination);

    setTimeout(() => {
      this.cdr.detectChanges();

      // Cierra el dropdown manualmente
      const dropdownElement = document.querySelector(
        '.dropdown-menu.show'
      ) as HTMLElement;
      if (dropdownElement) {
        dropdownElement.classList.remove('show');
      }
    }, 0);
  }

  increase(type: string) {
    this.passengers[type as keyof typeof this.passengers]++;
  }

  decrease(type: string) {
    if (type === 'adult' && this.passengers.adult > 1) {
      this.passengers.adult--;
    } else if (
      type !== 'adult' &&
      this.passengers[type as keyof typeof this.passengers] > 0
    ) {
      this.passengers[type as keyof typeof this.passengers]--;
    }
  }

  getPassengerSummary(): string {
    const { adult, child, infant } = this.passengers;
    let summary = `${adult} Adulto${adult > 1 ? 's' : ''}`;

    if (child > 0) summary += `, ${child} Niño${child > 1 ? 's' : ''}`;
    if (infant > 0) summary += `, ${infant} Bebé${infant > 1 ? 's' : ''}`;

    return summary;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

/*

 flightFrom: {
    origin: AirportModel | null;
    destination: AirportModel | null;
    departureDate: Date;
    returnDate: Date;
    passengers: {
      adult: number;
      child: number;
      infant: number;
    };
    promoCode: string;
  } = {
    origin: null,
    destination: null,
    departureDate: new Date(),
    returnDate: new Date(),
    passengers: {
      adult: 1,
      child: 0,
      infant: 0,
    },
    promoCode: '',
  }

*/
