import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          ),
      },
      {
          path: 'create-lead',
          loadComponent: () =>
            import('./features/create-lead/create-lead.component').then(
              (c) => c.CreateLeadComponent,
            ),
        },     

      {
        path: 'lead-management',
        loadComponent: () =>
          import('./features/lead-management/lead-management.component').then(
            (c) => c.LeadManagementComponent,
          ),
      },

      {
        path: 'lead/:id',
        loadComponent: () =>
          import('./features/lead-detail/lead-detail.component').then(
            (c) => c.LeadDetailComponent,
          ),
      },

      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/schedule-calendar/schedule-calendar.component').then(
            (c) => c.ScheduleCalendarComponent,
          ),
      },

      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/task-management/task-management.component').then(
            (c) => c.TaskManagementComponent,
          ),
      },
    ],
    // canActivate:[authGuard]
  },



  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.routes').then(
        (feature) => feature.routes,
      ),
  },

  // removed misspelled standalone route 'lead-datail' — handled under MainLayout children as 'lead/:id'
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];
