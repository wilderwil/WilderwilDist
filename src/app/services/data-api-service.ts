import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { JugadorInterface} from '../models/jugador';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
 @Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afirestore: AngularFirestore) {
  	this.jugadoresCollection=afirestore.collection<JugadorInterface>('jugadores');
  	this.jugadores=this.jugadoresCollection.valueChanges();
   }
  private jugadoresCollection: AngularFirestoreCollection<JugadorInterface>;
  private jugadores: Observable<JugadorInterface[]>;
  private jugadorDoc:AngularFirestoreDocument<JugadorInterface>;
  private jugador:Observable<JugadorInterface>;
  public jugadorSeleccionado:JugadorInterface={
   id:null
  };
  getAllProyects(){


  	return this.jugadores=this.jugadoresCollection.snapshotChanges()
    .pipe(map(changes =>{ 
      return changes.map(action=>{
        const data=action.payload.doc.data() as JugadorInterface;
         data.id=action.payload.doc.id;
        return data;
      });
    }));
   }

   getOneJugador(idJugador:string){
   	this.jugadorDoc=this.afirestore.doc<JugadorInterface>(`jugadores/${idJugador}`);
   	return this.jugador=this.jugadorDoc.snapshotChanges()
   	.pipe(map(action =>{
   		if(action.payload.exists === false){
			return null;
   		}else{
   			const data=action.payload.data() as JugadorInterface;
   			data.id=action.payload.id;
   			return data;
   		}
   	
   	}));
   }
  addJugador(jugador:JugadorInterface): void { 
    this.jugadoresCollection.add(jugador);

  }
  updateJugador(jugador:JugadorInterface): void { 
    let jugadorId=jugador.id;
    this.jugadorDoc=this.afirestore.doc<JugadorInterface>(`jugadores/${jugadorId}`);
    this.jugadorDoc.update(jugador);
  }
  deleteProyect(idJugador:string): void { 
     this.jugadorDoc=this.afirestore.doc<JugadorInterface>(`jugadores/${idJugador}`);
     this.jugadorDoc.delete();
  }


}
