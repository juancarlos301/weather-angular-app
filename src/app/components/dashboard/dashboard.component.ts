import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  urlImage =
    'https://creazilla-store.fra1.digitaloceanspaces.com/icons/7911203/weather-icon-md.png';
  city = '';
  humidity = 0;
  temperature = 0;
  weather = '';
  query = false;
  loading = false;
  showError = false;

  constructor(private _weatherService: WeatherService) {}
  getWeather() {
    this.query = false;
    this.loading = true;

    this._weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.loading = false;
        this.query = true;
        this.temperature = data.main.temp - 273;
        this.humidity = data.main.humidity;
        this.weather = data.weather[0].main;
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.onError();
      }
    );
  }

  onError() {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
      this.city = '';
    }, 3000);
  }
}
