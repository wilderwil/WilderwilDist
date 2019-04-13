import { Component, OnInit } from '@angular/core';
import { JugadorInterface } from '../../models/jugador';
import { DataApiService } from '../../services/data-api-service';
import { BujeApiService } from '../../services/buje-api-service';
import { BujeInterface } from '../../models/buje';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',

})
export class ModalComponent implements OnInit {

  constructor(private daService:DataApiService,public baService:BujeApiService) { }

  ngOnInit() {
  }


  AgregarBuje(bujeForm:NgForm):void{
  	if(bujeForm.value.bujeId==null){
	this.baService.addBuje(bujeForm.value);

  	}else{
  		
  		console.log("jugador",bujeForm.value)
  		this.baService.updateBuje(bujeForm.value);
  	}


  }
}
