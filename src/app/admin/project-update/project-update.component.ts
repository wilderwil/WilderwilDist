import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs/'
@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  	const el = document.getElementById('elemento');
  console.log("elemento", el );
// Create an Observable that will publish mouse movements
const mouseMoves = fromEvent(el, 'mousemove');
 
// Subscribe to start listening for mouse-move events
const subscription = mouseMoves.subscribe((evt: MouseEvent) => {
  // Log coords of mouse movements
  console.log(`Coords: ${evt.clientX} X ${evt.clientY}`);
 
  // When the mouse is over the upper-left of the screen,
  // unsubscribe to stop listening for mouse movements
  if (evt.clientX < 40 && evt.clientY < 40) {
    subscription.unsubscribe();
  }

// Create an Observable that will create an AJAX request
const apiData = ajax('http://www.transantiago.cl/restservice/rest/getrecorrido/503');
// Subscribe to create the request
apiData.subscribe(res => console.log(res.status, res.response));

});
  

  //asyn pipe 

  }//fin ngOnInit


   time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000)
  });


}





 
