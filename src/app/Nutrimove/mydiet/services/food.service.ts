import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { Food } from '../model/food.entity';

@Injectable({
  providedIn: 'root'
})
export class FoodService extends BaseService<Food> {
  public endpoint = 'food';

  constructor(protected override http: HttpClient) {
    super(http);
    this.resourceEndPoint = '/food';
  }
}
