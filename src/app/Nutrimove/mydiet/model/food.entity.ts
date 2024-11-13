export class Food {

  id: number;
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  user_id: number;

  constructor(food: {id?: number, name?: string, calories?: number, proteins?: number, carbs?: number, fats?: number, user_id?: number}) {
    this.id = food.id || 0;
    this.name = food.name ||"";
    this.calories = food.calories || 0;
    this.proteins = food.proteins || 0;
    this.carbs = food.carbs || 0;
    this.fats = food.fats || 0;
    this.user_id = food.user_id || 0;
  }
}
