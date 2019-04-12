import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';




import { AngularFireModule } from '@angular/fire' ;
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProfileComponent } from './users/profile/profile.component';

 var config = {
    apiKey: "AIzaSyCvZhnKH1GYy0g9suhO2qtWqCCe4PuotR4",
    authDomain: "angular-portafolio-b3022.firebaseapp.com",
    databaseURL: "https://angular-portafolio-b3022.firebaseio.com",
    projectId: "angular-portafolio-b3022",
    storageBucket: "angular-portafolio-b3022.appspot.com",
    messagingSenderId: "376328738143"
  };


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent, 
    AboutComponent,
    ContactComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
