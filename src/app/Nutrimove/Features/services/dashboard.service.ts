import { Injectable } from '@angular/core';
import {BaseService} from '../../../shared/services/base.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private baseService: BaseService<any>) { }

  getAllHydration(userId: number | undefined): Observable<any[]> {
    return this.baseService.getAll('hydration').pipe(
      map(hydrations => {
        return hydrations.filter(hydration => hydration.user_id === userId);
      })
    );
  }

  getAllSleep(userId: number | undefined): Observable<any[]> {
    return this.baseService.getAll('sleep').pipe(
      map(sleep => {
        const a = sleep.filter(sleep => sleep.user_id === userId);
        return a;
      })
    );
  }

  getGoal(userId: number | undefined):Observable<any> {
    return this.baseService.getAll('goal').pipe(
      map(goal => {
        return goal.find(goal => goal.user_id === userId);
      })
    )
  }

  updateGoal(id: number, goalData: any) {
    return this.baseService.update('goal', id, goalData);
  }

  getLatestSleepLast24Hours(userId: number | undefined): Observable<any> {
    return this.getAllSleep(userId).pipe(
      map(sleep => {
        if (!sleep || sleep.length === 0) {
          return null;
        }

        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const recentSleep = sleep.filter((sleep: { date: string | number | Date; }) =>
          new Date(sleep.date) >= last24Hours
        );

        if (recentSleep.length === 0) {
          return null;
        }


        const totalHoursSlept = recentSleep.reduce((total, current) => {
          return total + (current.hours_slept || 0);
        }, 0);

        return totalHoursSlept;

      })
    );
  }

  getLatestHydrationLast24Hours(userId: number | undefined): Observable<any> {
    return this.getAllHydration(userId).pipe(
      map(hydrations => {
        if (!hydrations || hydrations.length === 0) {
          return null;
        }

        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const recentHydrations = hydrations.filter((hydration: { date: string | number | Date; }) =>
          new Date(hydration.date) >= last24Hours
        );

        if (recentHydrations.length === 0) {
          return null;
        }
        const totalmlDrink = recentHydrations.reduce((total, current) => {
          return total + (current.quantity_ml || 0);
        }, 0);

        console.log("ml" + totalmlDrink);

        return totalmlDrink;
      })
    );
  }

  updateHours(userId: number | undefined, hours: number, quality: string): Observable<any> {

    const response = {
      id: 0,
      user_id: userId,
      date: new Date().toISOString(),
      hours_slept: hours,
      quality: quality
    }


    return this.baseService.create("sleep", response );

  }
  updateHydration(userId: number | undefined, quantity: number): Observable<any> {

    const response = {
      id: 0,
      user_id: userId,
      date: new Date().toISOString(),
      quantity_ml: quantity
    }


    return this.baseService.create("hydration", response );

  }
}
