import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { DxDataGridModule, DxFormModule,DxSelectBoxModule,DxPopupModule, DxPopoverModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  
  
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),DxPopupModule, DxPopoverModule, DxDataGridModule, DxFormModule,DxSelectBoxModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
  ]
})
export class AppRoutingModule { }
