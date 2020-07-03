import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './layouts/components/login-layout.component';
import { LayoutComponent } from './layouts/components/layout.component';
import { AuthGuard, NoAuthGuard } from './core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [NoAuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: 'auth',
    component: LoginLayoutComponent,
    canActivate: [NoAuthGuard],
    loadChildren: () => import('@modules/login/login.module').then(m => m.LoginModule)
  },
  // Fallback when no prior routes are matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
