import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { DisplayEmployeeComponent } from './components/display-employee/display-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CustomInterceptor } from './services/custom.interceptor';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AddEmployeeComponent,
    DisplayEmployeeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AppRoutingModule,HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,  useClass:CustomInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
