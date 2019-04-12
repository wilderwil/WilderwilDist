import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
	user:User;
  constructor(public router: Router, public afAuth:AngularFireAuth ) {
  	// Nos suscribimos al estado de la Autenticacion
  	this.afAuth.authState.subscribe(user => {
  		//Si el usuario es Logueado se almacena en el LocalStorage del explorador
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log("Usuario",user);
      } else {
      	// si no es logueado se almacena null
        localStorage.setItem('user', null);
      }
    })

   }
//Metodo que permite Registrar un Usuario
   registroUser(user,password){
     return new Promise((resolve,reject)=>{
       this.afAuth.auth.createUserWithEmailAndPassword(user,password)
       .then(userData=> resolve(userData),err=>reject(err));
     });
   }
  // loginEmailUser(){}
  //Metodo que permite el login del usuario con una cuenta de Facebook diferente a la de abajo
  /*
   public async loginFacebookUser(){
     try {
    await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this.router.navigate(['admin/list']);
} catch (e) {
    alert("Error!"  +  e.message);
}
   }
   */
  
    loginFacebookUser(){
      return new Promise ((resolve,reject)=>{ this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
        .then(userData => resolve(userData),err => reject(err));
  });
   
   }
  
//Metodo que permite el login del usuario con una cuenta de Google de una forma diferente a la de abajo
/*
  public async loginGoogleUser(){
     try {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['admin/list']);
} catch (e) {
    alert("Error!"  +  e.message);
}
 }*/
   loginGoogleUser(){
      return new Promise ((resolve,reject)=>{ this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(userData => resolve(userData),err => reject(err));
  });
   
   }
//metodo que hace el login del usuario 
/*
public async  loginEmailUser(email:  string, password:  string) {

try {
    await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['admin/list']);
} catch (e) {
    alert("Error!"  +  e.message);
}
}
*/
loginEmailUser(email:string,password:string){
  return new Promise((resolve,reject)=>{this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(userData => resolve(userData),err => reject(err));
  });
}
//metodo que hace el logout del usuario 
async salir(){
    try {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  } catch (e) {
    alert("Error!"  +  e.message);
}    
}


// Metodo que cheque si el usuario esta logueado 
get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
}
Authorizado(){
  return this.afAuth.authState.pipe(map(auth=>auth));
}
}


