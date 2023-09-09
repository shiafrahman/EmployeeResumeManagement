import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  constructor(private router:Router) { }
  addUsername(username:string){
    localStorage.setItem('username',username);
  }
  addAccessToken(accessToken:string){
    localStorage.setItem('accessToken',accessToken);
  }
  addRefreshToken(refToken:string){
    localStorage.setItem('refreshToken',refToken);
  }
  getAccessToken(){
    return localStorage.getItem('accessToken');
  }
  getUsername(){
    return localStorage.getItem('username');
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  isLoggedIn(){
    return !!this.getAccessToken() && !this.isTokenExpired()
  }
  isTokenExpired(){
    const token: string=this.getAccessToken()??"";
        if(!token)
          return false;
        const tokenSplit:string=token.split('.')[1];
        const decodedString:string=atob(tokenSplit);
        const jsonString=JSON.parse(decodedString);
        const expiry = (jsonString).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.router.navigate(['/login']);
    }

}
