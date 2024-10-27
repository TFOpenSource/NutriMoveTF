import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/model/User/user.entity';
import {NgIf} from '@angular/common';
import {AuthenApiService} from '../../../Access/services/authen-api.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DashboardService} from '../../services/dashboard.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinner,
    TranslateModule
  ],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css'
})
export class HomeContentComponent implements OnInit {

  progress_hyd = 0;
  progress_cal = 10;
  progress_sleep = 0;


  GOAL_HYDRATION: number = 2500;
  GOAL_SLEEP: number = 8;

  currentUser: User | null = null;
  user_id: number | undefined = 0;
  latestHydrationData: any | null = null;
  latestSleepData: any | null = null;

  constructor(private authenService: AuthenApiService, private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        this.user_id = user?.id;
        console.log(this.currentUser?.id);
        console.log('Usuario autenticado en Home:', this.currentUser);

        this.getLatestHydrationForLast24Hours();
        this.getLatestSleepForLast24Hours()
      },
      error => {
        console.error('Error fetching current user:', error);
      }

    );



  }

  private getLatestHydrationForLast24Hours(): void {
    if (this.user_id) {
      this.dashboardService.getLatestHydrationLast24Hours(parseInt(String(this.user_id))).subscribe(
        data => {
          this.latestHydrationData = data;
          this.progress_hyd = this.latestHydrationData.quantity_ml * 100 / this.GOAL_HYDRATION;
          console.log(this.progress_hyd);
        },
        error => {
          console.error('Error fetching hydration data:', error);
        }
      );
    } else {
      console.warn('user_id is null or undefined');
    }

  }

  private getLatestSleepForLast24Hours(): void {
    if (this.user_id) {
      this.dashboardService.getLatestSleepLast24Hours(parseInt(String(this.user_id))).subscribe(
        data => {
          this.latestSleepData = data;
          this.progress_sleep = this.latestSleepData.hours_slept * 100 / this.GOAL_SLEEP;
          console.log(this.progress_sleep);
        },
        error => {
          console.error('Error fetching hydration data:', error);
        }
      );
    } else {
      console.warn('user_id is null or undefined');
    }

  }

}
