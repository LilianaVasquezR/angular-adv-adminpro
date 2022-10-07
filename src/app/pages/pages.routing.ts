import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';



const routes: Routes = [
    { 
        path:'dashboard',  // se queda como ruta por defecto 'dashboard' 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        canLoad:[AuthGuard],
        //carga los hijos es una funcion de fecha para importar el modulo de manera perezosa
       loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
    },  
];


@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class PagesRoutingModule {}
  