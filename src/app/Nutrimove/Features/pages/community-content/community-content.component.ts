import { Component, OnInit } from '@angular/core';
import { PexelsService } from './services/pexels.service';
import {NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-community-content',
  templateUrl: './community-content.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatCardContent,
    MatCard,
    MatCardModule,
  ],
  styleUrls: ['./community-content.component.css']
})
export class CommunityContentComponent implements OnInit {
  photos: any[] = [];
  videos: any[] = [];
  
  experiences: string[] = [
    'Empecé mi rutina hace 3 meses, ¡ya veo resultados! Más energía y mejor ánimo.',
    'Cada día más cerca de mi objetivo. La disciplina es clave.',
    'Tengo un físico de Yusepe porque como 8 eggs de la más alta calidad.',
    'El apoyo de la comunidad me ha mantenido motivado.',
    'He logrado mejorar mis tiempos en carrera gracias a las recomendaciones.',
    'Logrando avanzar con mis metas cada vez más.',
    'Cambiando todo para que me pueda sentir mejor.'
  ];

  constructor(private pexelsService: PexelsService) {}

  ngOnInit(): void {
    this.loadPhotos();
    this.loadVideos();
  }

  loadPhotos(): void {
    this.pexelsService.searchPhotos('fitness', 5).subscribe(
      (response: any) => {
        console.log('Fotos cargadas:', response.photos);
        this.photos = response.photos;
      },
      error => {
        console.error('Error al cargar las fotos:', error);
      }
    );
  }

  loadVideos(): void {
    this.pexelsService.searchVideos('fitness', 5).subscribe(
      (response: any) => {
        console.log('Videos cargados:', response.videos);
        this.videos = response.videos;
      },
      error => {
        console.error('Error al cargar los videos:', error);
      }
    );
  }
}
