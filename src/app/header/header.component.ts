import { Component, OnInit } from '@angular/core';
import  { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }
islog:boolean;
  ngOnInit() {
  }
  public salir(){

  	this.authService.salir();

  }
  
   public  isLoggedIn():boolean{
  // this.islog=this.authService.isLoggedIn;
   return this.authService.isLoggedIn;
  }


}
