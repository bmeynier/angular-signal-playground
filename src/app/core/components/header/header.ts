import { ChangeDetectionStrategy, Component, inject  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClockService } from '../../services/clock.service';
import { DashboardService } from '../../../features/dashboards/services/dashboard.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

  clock = inject(ClockService);
  dashboard = inject(DashboardService); // injecte le signal title

}
