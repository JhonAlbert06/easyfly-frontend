import { Component } from '@angular/core';
import { GetAirportsUseCase } from '../../domain/usescases/airport/airport-getAirports.usecase';
import { AirportModel } from '../../domain/models/airport.model';

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
  constructor(private GetAirport: GetAirportsUseCase) {}

  ngOnInit() {
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

  passengers = {
    adult: 1,
    child: 0,
    infant: 0,
  };

  isDropdownOpen = false;

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
