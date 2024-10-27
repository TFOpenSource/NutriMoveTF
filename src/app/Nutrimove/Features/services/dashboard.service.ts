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
        return sleep.filter(sleep => sleep.user_id === userId);
      })
    );
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

        return recentSleep.reduce((latest: { date: string | number | Date; }, current: { date: string | number | Date; }) =>
          new Date(current.date) > new Date(latest.date) ? current : latest
        );
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

        return recentHydrations.reduce((latest: { date: string | number | Date; }, current: { date: string | number | Date; }) =>
          new Date(current.date) > new Date(latest.date) ? current : latest
        );
      })
    );
  }
}
