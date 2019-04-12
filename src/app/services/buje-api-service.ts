import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { BujeInterface} from '../models/buje';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
 @Injectable({
  providedIn: 'root'
})
export class BujeApiService {
	private bujesCollection: AngularFirestoreCollection<BujeInterface>;
 	private bujes: Observable<BujeInterface[]>;
 	public bujeSeleccionado:BujeInterface={
   	id:null
  	};
  	private bujeDoc:AngularFirestoreDocument<BujeInterface>;
  private buje:Observable<BujeInterface>;
  
  
	constructor(private afirestore: AngularFirestore) {
  	this.bujesCollection=afirestore.collection<BujeInterface>('bujes2');
  	this.bujes=this.bujesCollection.valueChanges();
   }

   getAllBujes(){


  	return this.bujes=this.bujesCollection.snapshotChanges()
    .pipe(map(changes =>{ 
      return changes.map(action=>{
        const data=action.payload.doc.data() as BujeInterface;
         data.id=action.payload.doc.id;
        return data;
      });
    }));
   }

    getOneBuje(idBuje:string){
   	this.bujeDoc=this.afirestore.doc<BujeInterface>(`bujes2/${idBuje}`);
   	return this.buje=this.bujeDoc.snapshotChanges()
   	.pipe(map(action =>{
   		if(action.payload.exists === false){
			return null;
   		}else{
   			const data=action.payload.data() as BujeInterface;
   			data.id=action.payload.id;
   			return data;
   		}
   	
   	}));
   }
  addBuje(buje:BujeInterface): void { 
    this.bujesCollection.add(buje);

  }
  updateBuje(buje:BujeInterface): void { 
    let bujeId=buje.id;
    this.bujeDoc=this.afirestore.doc<BujeInterface>(`bujes2/${bujeId}`);
    this.bujeDoc.update(buje);
  }
  deleteBuje(idBuje:string): void { 
     this.bujeDoc=this.afirestore.doc<BujeInterface>(`bujes2/${idBuje}`);
     this.bujeDoc.delete();
  }

}
