import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  key = 'example api key';
  url_api = `https://api.openweathermap.org/data/2.5/weather?q=`;

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = this.url_api + city + '&appid=' + this.key;
    return this.http.get(url);
  }
}
