import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu:Menu[]=[];

  cargarMenu(){
  
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];// ***///
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Main', url: '/' },
  //       {titulo: 'Gráficas', url: 'grafica1' },
  //       {titulo: 'Rxjs', url: 'rxjs' }, 
  //       {titulo: 'Promesas', url: 'promesas' },
  //       {titulo: 'ProgressBar', url: 'progress' }, 
  //     ]
  //   },

  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: 'usuarios' },
  //       {titulo: 'Hospitales', url: 'hospitales' },
  //       {titulo: 'Médicos', url: 'medicos' }
  //     ]
  //   }
  // ];

}
