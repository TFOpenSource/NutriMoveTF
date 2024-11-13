import { Component, OnInit } from '@angular/core';
import { AuthenApiService } from "../../../../Access/services/authen-api.service";
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
import {TranslateModule} from '@ngx-translate/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ProfileEditComponent} from '../profile-edit/profile-edit.component';


@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    standalone: true,
  imports: [
    MatDialogModule,
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
    CommonModule,
    TranslateModule
  ],
    styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  currentUser: any = null;
  subscription: any = null;
  constructor(private authenService: AuthenApiService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;

    });

    this.authenService.getSubscription(this.currentUser.id).subscribe((subscription) => {
        this.subscription = subscription;

    })

  };

  onEdit(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '400px'
    });
  }


}
