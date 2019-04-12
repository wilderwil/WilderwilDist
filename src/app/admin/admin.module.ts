import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { ProjectComponent } from './project/project.component';
import { AdminRoutingModule } from  './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ProyectListDetailComponent } from './proyect-list-detail/proyect-list-detail.component';
import { ModalComponent } from './project-list/modal.component';
import { FormsModule } from '@angular/forms';
import { MonedaPipe } from '../moneda';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [MonedaPipe,ProjectListComponent,ProyectListDetailComponent, ProjectCreateComponent, ModalComponent,ProjectUpdateComponent, ProjectComponent, LoginComponent,RegistroComponent],
  imports: [
    CommonModule,AdminRoutingModule,FormsModule,DataTablesModule
  ]
})
export class AdminModule { }
