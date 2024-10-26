import { Component, OnInit } from '@angular/core';
import { RutinaApiService } from '../../services/rutina-api.service';
import {NgForOf} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-rutina-list',
  templateUrl: './rutina-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardModule
  ],
  styleUrls: ['./rutina-list.component.css']
})
export class RutinaListComponent implements OnInit {
  rutinas: any[] = [];
  muscle: any= "biceps";

  constructor(private rutinaApiService: RutinaApiService) {}

  ngOnInit(): void {
    this.rutinaApiService.getExercises().subscribe((data: any) => {
      this.rutinas = data;
    });
  }
}
