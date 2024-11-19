import {Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";
import {AuthenApiService} from '../../services/authen-api.service';
import {Router} from "@angular/router";
import {User} from '../../../../shared/model/User/user.entity';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {TranslateModule} from '@ngx-translate/core';


@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf, MatRadioButton, MatRadioGroup, TranslateModule],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.css'
})
export class RegisterDialogComponent implements OnInit{
  registerForm: FormGroup;
  errorMessage: string | null = null;
  data: any = null;
  currentUser: any=null;

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
      plan: ['', Validators.required]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, lastname, email, password, plan } = this.registerForm.value;

      let price: number = 0;
      let setTrial: boolean = true;
      let duration: number = 3;

      if (plan === "Premium Plan") {
        price = 9.99;
        setTrial = false;
        duration = 6;
      }

      const newUser = {
        name,
        lastname,
        email,
        password,
        privacy: "PRIVATE"
      };

      this.authenService.register(newUser as User).subscribe(
        (userResponse) => {
          console.log('User Created:', userResponse);

          //creacion de goal
          const createData = {
            goal_type: "-",
            start_date: "-",
            end_date: "-",
            userId: userResponse.id
          }



          //suscripciones
          this.data = {
            description: plan,
            price: price,
            monthDuration: duration,
            trial: setTrial,
            userId: userResponse.id,
          };

          /*
          this.authenService.createGoal(createData).subscribe(
            (response) => {
              console.log('Goal Created:', response);
            },
            error => {
              console.error('Error creating Goal:', error);
            }
          );*/

          //registro suscripcion
          this.authenService.registerSubscription(this.data).subscribe(
            (subscriptionResponse) => {
              console.log('Subscription Created:', subscriptionResponse);
              this.router.navigate(['/access']);
              alert("Registro completado");
              this.dialogRef.close();
            },
            (error) => {
              console.error('Error al crear la suscripción', error);
              this.errorMessage = 'Error al crear la suscripción';
            }
          );
        },
        (error) => {
          console.error('Error al crear el usuario', error);
          this.errorMessage = 'Error al registrar el usuario';
        }
      );
    }
  }




  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }


}
