import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import {AuthenApiService} from '../../services/authen-api.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.css'
})
export class RegisterDialogComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authenService: AuthenApiService,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private router:Router,
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;

      this.authenService.register(newUser).subscribe(
        (response) => {
          this.router.navigate(['/access']);
          alert("Registro completado");
          this.dialogRef.close();
        },
        (error) => {
          this.errorMessage = 'Error al registrar el usuario';
        }
      );
    }
  }

}
