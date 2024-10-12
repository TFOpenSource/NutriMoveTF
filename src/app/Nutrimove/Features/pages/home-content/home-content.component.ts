import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/model/User/user.entity';
import {NgIf} from '@angular/common';
import {AuthenApiService} from '../../../Access/services/authen-api.service';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css'
})
export class HomeContentComponent implements OnInit{

  currentUser: User | null = null;

  constructor(private authenService: AuthenApiService) {}

  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        console.log('Usuario autenticado en Home:', this.currentUser);
      }
    );
  }
}
