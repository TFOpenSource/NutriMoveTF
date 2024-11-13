import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/model/User/user.entity';
import {BaseService} from '../../../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private endpoint: string = 'user';  // Cambia la URL según la estructura de tu API

  constructor(private baseService: BaseService<any>) { }

  updateUser(userId: number, data: any): Observable<any> {
    return this.baseService.update(this.endpoint, userId, data);
  }

}
