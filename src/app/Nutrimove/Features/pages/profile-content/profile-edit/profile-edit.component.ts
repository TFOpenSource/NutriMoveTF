import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../../shared/model/User/user.entity';
import { UserSessionService } from "../services/UserSession.service";
import { ProfileApiService } from "../services/ProfileApi.service";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  userId: number | null = null;

  constructor(
      private fb: FormBuilder,
      private profileService: ProfileApiService,
      private router: Router,
      private userSession: UserSessionService
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
    this.userId = this.userSession.getUserId();
    if (this.userId) {
      this.loadUser(this.userId);
    } else {
      console.error('El ID del usuario no está disponible en el servicio');
    }
  }

  loadUser(userId: number): void {
    this.profileService.getUser(userId).subscribe(
        (user) => {
          this.currentUser = user;
          if (this.currentUser) {
            this.profileForm.patchValue({
              name: this.currentUser.name,
              lastname: this.currentUser.lastname,
              email: this.currentUser.email,
              privacy: this.currentUser.privacy,
              goal: this.currentUser.goal,
            });
          }
        },
        (error) => {
          console.error('Error al cargar el usuario:', error);
        }
    );
  }

  onSave(): void {
    if (this.profileForm.valid && this.userId) {
      const updatedUser = {
        ...this.currentUser,
        ...this.profileForm.value,
        goal: { goal_type: this.profileForm.value.goal }
      };

      this.profileService.updateUser(updatedUser).subscribe(
          (response) => {
            console.log('Perfil actualizado exitosamente.');
            this.router.navigate(['/profile/view']);
          },
          (error) => {
            console.error('Error al actualizar el perfil:', error);
          }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/profile/view']);
  }
}
