import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserInterface } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService:AuthService) { }
  user:UserInterface={
  	name:'',
  	email:'',
  	photoUrl:''
  }
  providerId:string;
  ngOnInit() {
  	this.authService.Authorizado().subscribe(user=>{
  		if(user){

  			this.user.email=user.email;
        this.user.name=user.displayName;
        this.user.photoUrl=user.photoURL;
  			console.log("Usuario", user);
        this.providerId=user.providerData[0].providerId;
  		}

  	})
  }

}
