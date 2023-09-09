import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DisplayEmployeeComponent } from './components/display-employee/display-employee.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [  
  {path:'',redirectTo:'login' , pathMatch:'full'},
  {path:'login' , component:LoginComponent},
  {path:'signup' , component:SignupComponent},
  {path:'addEmployee' , component:AddEmployeeComponent,canActivate: [AuthGuardService]},
  {path:'displayEmployee' , component:DisplayEmployeeComponent,canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
