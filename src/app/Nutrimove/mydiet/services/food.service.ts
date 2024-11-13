import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { Food } from '../model/food.entity';
import {Observable} from 'rxjs';
import {Recommendation} from '../../Activities/models/recommendations.entity';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodService extends BaseService<Food> {
  public endpoint = 'food';

  constructor(protected override http: HttpClient) {
    super(http);
    this.resourceEndPoint = '/food';
  }

  getMacros(userId: number | undefined): Observable<any> {
    return this.getAll("food").pipe(
      map(items => items.filter((item: Food) => item.user_id === userId)),
      map(filteredItems => {

        const macros = {
          calories: 0,
          proteins: 0,
          carbs: 0,
          fats: 0
        };


        filteredItems.forEach(item => {
          macros.calories += item.calories;
          macros.proteins += item.proteins;
          macros.carbs += item.carbs;
          macros.fats += item.fats;
        });

        return macros;
      })
    );
  }
}
