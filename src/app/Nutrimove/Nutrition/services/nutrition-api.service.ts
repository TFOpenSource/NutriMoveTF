import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionApiService {
  query = '1lb brisket and fries';
  apiKey = 'zeURsiTdX4j6drhvufm18A==GmPeE92Juys3iZ4P';
  baseUrl = 'https://api.api-ninjas.com/v1/nutrition';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    const url = `${this.baseUrl}?query=${this.query}`;
    return this.http.get(url, { headers });
  }
}
