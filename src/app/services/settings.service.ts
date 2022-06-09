import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';//para que cuando se recargue quede del mismo color
    this.linkTheme?.setAttribute('href', url);// checar linkTheme por que necesita ? al final  linkTheme?

   }

   changeTheme( theme: string ) {
    //procedimiento par acambiar el tema
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme?.setAttribute('href', url);// checar linkTheme por que necesita ? al final  linkTheme?
    localStorage.setItem('theme', url ); //

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector'); 

    links.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if ( btnThemeUrl === currentTheme ) {
        elem.classList.add('working');
      }

    });

  }




}
