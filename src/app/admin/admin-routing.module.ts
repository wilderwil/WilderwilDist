import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';

import { ProjectComponent } from  './project/project.component';
import { ProjectListComponent } from  './project-list/project-list.component';
import { ProjectCreateComponent } from  './project-create/project-create.component';
import { ProjectUpdateComponent } from  './project-update/project-update.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './admin.guard';
import { RegistroComponent } from './registro/registro.component'; 
import { ProfileComponent } from './../users/profile/profile.component'; 
import { ProyectListDetailComponent } from './proyect-list-detail/proyect-list-detail.component';

const  routes:  Routes  = [
{
path:  'admin',
component:  ProjectComponent,
children: [
{
path:  'list',
component:  ProjectListComponent,
canActivate: [AdminGuard]
},
{
path:  'detail/:id',
component:  ProyectListDetailComponent,
canActivate: [AdminGuard]
},
{
path:  'profile',
component:  ProfileComponent,
canActivate: [AdminGuard]
},
{
path:  'create',
component:  ProjectCreateComponent,
canActivate: [AdminGuard]
},
{
path:  'login',
component:  LoginComponent
},
{
path:  'registro',
component:  RegistroComponent
},
{
path:  'update',
component:  ProjectUpdateComponent,
canActivate: [AdminGuard]
}
]
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  AdminRoutingModule { }