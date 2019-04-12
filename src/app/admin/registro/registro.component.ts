import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from  "@angular/router";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';//para recuperar nombre de  la foto 
import { Observable } from 'rxjs/internal/Observable';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private authService: AuthService,private router:Router,private storage:AngularFireStorage) { }
 @ViewChild('imagUser') inputImagenUsuario:ElementRef;
  uploadPercent:Observable<number>;
  urlImage:Observable<string>;
  ngOnInit() {
  }

registroUser(user,password){
  this.authService.registroUser(user,password)
  .then((res)=>{
  this.authService.Authorizado().subscribe(user=>{
    if(user){
        user.updateProfile({
        displayName:'',
        photoURL:this.inputImagenUsuario.nativeElement.value
      }).then(()=>{
        this.router.navigate(['admin/list']);
      }).catch((error)=> console.log("error",error));
    }
  });
  }).catch(err=> console.log("Error ",err.message));
}
onUpload(e){
  const id=Math.random().toString(36).substring(2);
  const file=e.target.files[0];
  console.log("foto ",file);
  const filePath=`uploads/profile_${id}`;
  const ref=this.storage.ref(filePath);
  const task=this.storage.upload(filePath,file);
  //porcentaje de carga
  this.uploadPercent=task.percentageChanges();
  //recuperar url del fichero que ya se subio
  task.snapshotChanges().pipe(finalize(()=> this.urlImage=ref.getDownloadURL())).subscribe();
}
}
 