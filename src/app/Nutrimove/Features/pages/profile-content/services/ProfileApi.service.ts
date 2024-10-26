import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/model/User/user.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private apiUrl = 'http://localhost:3000/users';  // Cambia la URL según la estructura de tu API

  constructor(private http: HttpClient) {}

  // Obtener el perfil del usuario por ID
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // Actualizar el perfil del usuario
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
}
