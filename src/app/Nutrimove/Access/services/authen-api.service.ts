import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../shared/model/User/user.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthenApiService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private baseService: BaseService<User>) {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User | null> {
    return this.getAllUsers().pipe(
      map((users: User[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user){
          this.currentUserSubject.next(user);
          localStorage.setItem('authUser', JSON.stringify(user));
        }
        return user ? user : null;
      })
    );
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  register(user: User): Observable<User> {

    return this.baseService.create('user', user); // Usa 'users' como el endpoint

  }

  getAllUsers(): Observable<User[]> {
    return this.baseService.getAll('user');
  }

  getUserById(id: number): Observable<User> {
    return this.baseService.getById('user', id);
  }

  updateUser(user: User): Observable<User> {
    return this.baseService.update('user', user.id, user);
  }
}
