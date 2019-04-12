import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api-service';
import { JugadorInterface} from '../../models/jugador';

import {ActivatedRoute,Params } from '@angular/router'
@Component({
  selector: 'app-proyect-list-detail',
  templateUrl: './proyect-list-detail.component.html',
  styleUrls: ['./proyect-list-detail.component.css']
})
export class ProyectListDetailComponent implements OnInit {

  constructor(private daservice:DataApiService, private route:ActivatedRoute) { }
  public jugador: JugadorInterface={};
  ngOnInit() {
  	const idJugador=this.route.snapshot.params['id'];
    this.getDetalle(idJugador);
  	
  }
  getDetalle(idJugador:string){
    this.daservice.getOneJugador(idJugador).subscribe(jugador => {
      this.jugador=jugador;
    });
  }



}
