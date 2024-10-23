export class Nutrition {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;

  constructor() {
    this.name = '';
    this.calories = 0;
    this.serving_size_g = 0;
    this.fat_total_g = 0;
    this.fat_saturated_g = 0;
    this.protein_g = 0;
    this.sodium_mg = 0;
    this.potassium_mg = 0;
    this.cholesterol_mg = 0;
    this.carbohydrates_total_g = 0;
    this.fiber_g = 0;
    this.sugar_g = 0;
  }
}
