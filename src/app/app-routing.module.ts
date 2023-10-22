import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ProdutosComponent } from './components/produtos/produtos.component';
import { AuthGuard } from './guard/auth.guard';
import { ReportPageModule } from './pages/report/report.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  { 
    path: 'home/produtos', component: ProdutosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report', loadChildren: () => import('./pages/report/report.module').then(m => m.ReportPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: '**',
    redirectTo: 'home' // Rota curinga para redirecionar para 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
