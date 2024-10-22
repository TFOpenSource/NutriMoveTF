import { Component, OnInit } from '@angular/core';
import { AuthenApiService } from "../../../../Access/services/authen-api.service";
import { User } from '../../../../../shared/model/User/user.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  standalone: true,
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  currentUser: any;

  constructor(private authenService: AuthenApiService, private router: Router) {}

  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }

  onEdit() {
    this.router.navigate(['/profile/edit']);
  }
}
