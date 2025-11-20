import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboards/pages/dashboard/dashboard';
import { Readme } from './features/dashboards/pages/readme/readme';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'readme', component: Readme},
];
