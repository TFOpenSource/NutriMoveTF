import { Component, OnInit } from '@angular/core';
import { AuthenApiService } from "../../../../Access/services/authen-api.service";
import { User } from '../../../../../shared/model/User/user.entity';
import { Router } from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    standalone: true,
    imports: [
        MatCardTitle,
        MatCard,
        MatCardContent,
        MatCardActions,
        MatRadioGroup,
        MatRadioButton,
        MatButton,
        MatFormField,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        CommonModule
    ],
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
  };

  onEdit() {
    this.router.navigate(['/profile/edit']);
  }

}
