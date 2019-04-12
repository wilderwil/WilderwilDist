import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private   authService:  AuthService,private router:Router) { }

  ngOnInit() {
  }
   login(user,password):void{
  	this.authService.loginEmailUser(user,password).then((res)=>{
      console.log ('resUser',res);
      this.router.navigate(['admin/list']);
    }).catch(err=> console.log("Error ",err.message));
  }
  loginGoogle():void{
this.authService.loginGoogleUser().then((res)=>{
      console.log ('resUser',res);
      this.router.navigate(['admin/list']);
    }).catch(err=> console.log("Error ",err.message));
  //  this.authService.loginGoogleUser();
  }
loginFacebook():void{
  this.authService.loginFacebookUser().then((res)=>{
      console.log ('resUser',res);
      this.router.navigate(['admin/list']);
    }).catch(err=> console.log("Error ",err.message));

    //this.authService.loginFacebookUser();
  }
  
}
