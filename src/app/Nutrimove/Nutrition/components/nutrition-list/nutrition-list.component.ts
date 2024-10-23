import { Component, OnInit } from '@angular/core';
import { NutritionApiService } from '../../services/nutrition-api.service';
import {NgForOf} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-rutina-list',
  templateUrl: './nutrition-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardModule
  ],
  styleUrls: ['./nutrition-list.component.css']
})
export class NutritionListComponent implements OnInit {
  nutritions: any[] = [];
  query: any= "1lb brisket and fries";

  constructor(private nutritionsApiService: NutritionApiService) {}

  ngOnInit(): void {
    this.nutritionsApiService.getExercises().subscribe((data: any) => {
      this.nutritions = data;
    });
  }
}
