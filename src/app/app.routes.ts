import { Routes } from '@angular/router';
import {NotFoundPage} from './public/pages/not-found/not-found.page';
import {HomeContentComponent} from './Nutrimove/Features/pages/home-content/home-content.component';
import {AnalysisContentPage} from './Nutrimove/Features/pages/analysis-content/analysis-content.page';
import {AccessPagePage} from './Nutrimove/Access/pages/access-page/access-page.page';
import {AuthGuard} from './shared/guards/auth.guard';
import {MydietManagementComponent} from './Nutrimove/mydiet/pages/mydiet-page-management/mydiet-page-management.component';

export const routes: Routes = [

  {path: 'home', component: HomeContentComponent, canActivate: [AuthGuard] },
  {path: 'home/analysis', component: AnalysisContentPage},
  {path: 'home/mydiet', component: MydietManagementComponent},
  {path: 'access', component: AccessPagePage},
  { path: '', redirectTo: '/access', pathMatch: 'full' },

  {path: '**', component: NotFoundPage },


];
