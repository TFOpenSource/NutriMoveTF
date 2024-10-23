import { Routes } from '@angular/router';
import { NotFoundPage } from './public/pages/not-found/not-found.page';
import { HomeContentComponent } from './Nutrimove/Features/pages/home-content/home-content.component';
import { AnalysisContentPage } from './Nutrimove/Features/pages/analysis-content/analysis-content.page';
import { AccessPagePage } from './Nutrimove/Access/pages/access-page/access-page.page';
import { ProfileEditComponent } from './Nutrimove/Features/pages/profile-content/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './Nutrimove/Features/pages/profile-content/profile-view/profile-view.component';
import { AuthGuard } from './shared/guards/auth.guard';
import {ActivitiesPageComponent} from './Nutrimove/Activities/components/activities-page/activities-page.component';


export const routes: Routes = [
  { path: 'home', component: HomeContentComponent, canActivate: [AuthGuard] },
  { path: 'home/analysis', component: AnalysisContentPage },
  { path: 'home/activities', component: ActivitiesPageComponent},
  { path: 'access', component: AccessPagePage },
  { path: 'profile/view', component: ProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/access', pathMatch: 'full' },
  { path: '**', component: NotFoundPage },
];
