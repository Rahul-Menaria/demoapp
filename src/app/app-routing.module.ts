import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/users/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'customer',
    loadChildren: () => import('./pages/users/customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'add-customer',
    loadChildren: () => import('./pages/users/add-customer/add-customer.module').then( m => m.AddCustomerPageModule)
  },
  {
    path: 'editimage',
    loadChildren: () => import('./pages/users/editimage/editimage.module').then( m => m.EditimagePageModule)
  },
  {
    path: 'myedit',
    loadChildren: () => import('./pages/users/myedit/myedit.module').then( m => m.MyeditPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/users/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./pages/users/service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./pages/users/chart/chart.module').then( m => m.ChartPageModule)
  },
  {
    path: 'servererror',
    loadChildren: () => import('./errors/servererror/servererror.module').then( m => m.ServererrorPageModule)
  },
  {
    path: 'pageNotFound',
    loadChildren: () => import('./errors/pagenotfound/pagenotfound.module').then( m => m.PagenotfoundPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./errors/pagenotfound/pagenotfound.module').then( m => m.PagenotfoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}