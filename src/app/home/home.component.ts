import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
