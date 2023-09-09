import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../Models/loginRequestModel';
import { LoginResponseModel } from '../Models/loginResponse';
import { SignupRequestModel } from '../Models/signupRequestModel';
import { Status } from '../Models/status';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  baseUrl:string='http://localhost:5073';
login(model:LoginRequestModel){
  return this.http.post<LoginResponseModel>(this.baseUrl+'/api/Authorization/Login',model);
}
signup(model:SignupRequestModel){
  return this.http.post<Status>(this.baseUrl+'/api/Authorization/Registration',model);
}
}
