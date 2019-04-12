import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  titulo: String;


cambiaLado(valor) {
    this.titulo = valor+"2";
  }
 
}

