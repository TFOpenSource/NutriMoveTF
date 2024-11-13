import {Component, Input, OnInit} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { SwitcherComponent } from '../switcher/switcher.component';
import { MatAnchor } from '@angular/material/button';
import { NgForOf, NgIf } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../../../Nutrimove/Access/components/login-dialog/login-dialog.component';
import {RegisterDialogComponent} from '../../../Nutrimove/Access/components/register-dialog/register-dialog.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    SwitcherComponent,
    MatAnchor,
    NgIf,
    NgForOf,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'] // Aquí corregí de styleUrl a styleUrls
})
export class ToolbarComponent implements OnInit {

  constructor(protected router: Router, public dialog: MatDialog) {}

  features = [
    { path: 'home', title: 'Home' },
    { path: 'home/mydiet', title: 'My Diet' },
    { path: 'home/activities', title: 'Activities' },
    { path: 'home/analysis', title: 'Analysis' },
    { path: 'home/community', title: 'Community' },
    { path: 'home/rutines', title: 'Rutines' },
    { path: 'profile/view', title: 'Profile' }

  ];

access = [
    { title: 'Register' },
    { title: 'Login' }
  ];

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Ruta actual:', event.url);
    });
  }

  trackByTitle(index: number, option: any): string {
    return option.title;
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '400px'});
  }
  openRegDialog(): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '900px', height:'600px'});
  }
}
