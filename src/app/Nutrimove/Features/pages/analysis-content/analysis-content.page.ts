import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {User} from '../../../../shared/model/User/user.entity';
import {AuthenApiService} from '../../../Access/services/authen-api.service';

@Component({
  selector: 'app-analysis-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './analysis-content.page.html',
  styleUrl: './analysis-content.page.css'
})
export class AnalysisContentPage implements OnInit {

  currentUser: User | null = null;
  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        console.log('Usuario autenticado en Home:', this.currentUser);
      }
    );
  }

  healthForm: FormGroup;
  bmi: number | null = null;

  constructor(private fb: FormBuilder, private authenService: AuthenApiService) {

    this.healthForm = this.fb.group({
      height: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      proteins: ['', [Validators.min(0)]],
      carbohydrates: ['', [Validators.min(0)]],
      fats: ['', [Validators.min(0)]]
    });
  }

  calculateBMI() {
    const height = this.healthForm.value.height / 100;
    const weight = this.healthForm.value.weight;

    if (height > 0 && weight > 0) {
      this.bmi = weight / (height * height);
    }
  }
}
