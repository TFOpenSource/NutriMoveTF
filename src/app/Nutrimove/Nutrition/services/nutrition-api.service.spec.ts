import { TestBed } from '@angular/core/testing';

import {NutritionApiService} from './nutrition-api.service';

describe('NutritionApiService', () => {
  let service: NutritionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
