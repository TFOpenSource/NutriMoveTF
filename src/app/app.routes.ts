import { Routes } from '@angular/router';
import { NotFoundPage } from './public/pages/not-found/not-found.page';
import { HomeContentComponent } from './Nutrimove/Features/pages/home-content/home-content.component';
import { AnalysisContentPage } from './Nutrimove/Features/pages/analysis-content/analysis-content.page';
import { AccessPagePage } from './Nutrimove/Access/pages/access-page/access-page.page';
import { ProfileEditComponent } from './Nutrimove/Features/pages/profile-content/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './Nutrimove/Features/pages/profile-content/profile-view/profile-view.component';
import {RutinaListComponent} from './Nutrimove/Rutines/components/rutina-list/rutina-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import {MydietManagementComponent} from './Nutrimove/mydiet/pages/mydiet-page-management/mydiet-page-management.component';
import {CommunityContentComponent} from './Nutrimove/Features/pages/community-content/community-content.component';
import {ActivitiesPageComponent} from './Nutrimove/Activities/components/activities-page/activities-page.component';


export const routes: Routes = [
  { path: 'home', component: HomeContentComponent, canActivate: [AuthGuard] },
  { path: 'home/analysis', component: AnalysisContentPage },
  { path: 'home/mydiet', component: MydietManagementComponent},
  {path: 'home/rutines', component: RutinaListComponent},
  { path: 'home/activities', component: ActivitiesPageComponent},
  { path: 'access', component: AccessPagePage },
  { path: 'profile/view', component: ProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'home/community', component: CommunityContentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/access', pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];
