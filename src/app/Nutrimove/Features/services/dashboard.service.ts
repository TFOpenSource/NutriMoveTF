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

  getAllSleep(_userId: number | undefined): Observable<any[]> {
    return this.baseService.getAll('sleep').pipe(
      map(sleep => {
        const a = sleep.filter(sleep => sleep.userId === _userId);
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
    console.log('Obteniendo datos de sueño para el userId:', userId); // Verificar el userId al inicio

    return this.getAllSleep(userId).pipe(
      map(sleep => {
        console.log('Datos obtenidos de sueño:', sleep); // Ver los datos de sueño obtenidos

        if (!sleep || sleep.length === 0) {
          console.log('No se encontraron datos de sueño o está vacío');
          return null;
        }

        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        console.log('Fecha actual:', now);
        console.log('Fecha límite para las últimas 24 horas:', last24Hours);

        const recentSleep = sleep.filter((sleep: { date: string | number | Date; }) =>
          new Date(sleep.date) >= last24Hours
        );

        console.log('Datos de sueño recientes en las últimas 24 horas:', recentSleep); // Ver los datos filtrados

        if (recentSleep.length === 0) {
          console.log('No se encontraron datos de sueño en las últimas 24 horas');
          return null;
        }

        const totalHoursSlept = recentSleep.reduce((total, current) => {
          const hours = current.hoursSlept || 0;
          console.log('Horas de sueño de este registro:', hours); // Verificar las horas de sueño de cada registro
          return total + hours;
        }, 0);

        console.log('Total de horas de sueño en las últimas 24 horas:', totalHoursSlept); // Ver el total calculado

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

  updateHours(user_id: number | undefined, hours: number, quality: string): Observable<any> {

    const response = {
      userId: user_id,
      date: new Date().toISOString(),
      hoursSlept: hours,
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

  getMedicalHistory(userId: number | undefined): Observable<any[]> {
    return this.baseService.getAll('medical_history').pipe(
      map((history: any[]) => {
        return history.filter(record => record.user_id === userId);
      })
    );
  }

  updateMedicalHistory(record: any): Observable<any> {
    return this.baseService.update('medical_history', record.id, record);
  }

  deleteMedicalHistory(recordId: number): Observable<any> {
    return this.baseService.delete('medical_history', recordId);
  }

  addMedicalHistory(record: any): Observable<any> {
    return this.baseService.create('medical_history', record);
  }

}
