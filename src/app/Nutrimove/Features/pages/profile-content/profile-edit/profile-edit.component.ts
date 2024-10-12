import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenApiService } from "../../../../Access/services/authen-api.service";
import { User } from '../../../../../shared/model/User/user.entity';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authenService: AuthenApiService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      privacy: ['private', Validators.required],
      goal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        if (this.currentUser) {
          this.profileForm.patchValue({
            name: this.currentUser.name,
            lastname: this.currentUser.lastname,
            email: this.currentUser.email,
            privacy: this.currentUser.privacy,
            goal: this.currentUser.goal
          });
        }
      }
    );
  }

  onSave(): void {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.currentUser,
        ...this.profileForm.value
      };

      this.authenService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('Profile updated successfully.');
          this.router.navigate(['/profile/view']);
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/profile/view']);
  }
}
