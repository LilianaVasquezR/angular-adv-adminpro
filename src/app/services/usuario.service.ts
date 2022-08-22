import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { empty, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;
 

  constructor( private http:HttpClient,
                private router: Router,
                private ngZone: NgZone ) {
    
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role!;// marca el error de indefinido
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }     
    }
  }


  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '738299851022-ioe20r7laml9j64gu5o5asula3elagjh.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })
    
  }

  guardarLocalStorage( token: string, menu: any ) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu)); // se debe pasar por el JSON.stringify para grabarlo como si fuera un string ya que menu es un arreglo
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');       
      })
    });

  }
  
  validarToken(): Observable<boolean> {
  
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );

          this.guardarLocalStorage( resp.token, resp.menu );

        return true;
      }),
      catchError( error => of(false) )
    );

  }
  
  crearUsuario( formData: RegisterForm) {
    
      return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any ) => {
                  this.guardarLocalStorage( resp.token, resp.menu );
                })
              )
              
  }

  actualizarPerfil( data: {email:string, nombre: string, role: string | undefined }) {// agregue el | undefined

  data = {
    ...data,
    role: this.usuario.role
  };

  return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers );

}

  login( formData: LoginForm) {
    
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any ) => {
                    this.guardarLocalStorage( resp.token, resp.menu );
                  })
                );
    
  }

  loginGoogle( token:any ) {
    
    return this.http.post(`${ base_url }/login/google`, { token })
                .pipe(
                  tap( (resp: any ) => {
                    this.guardarLocalStorage( resp.token, resp.menu );
                  })
                );
    
  }


  cargarUsuarios( desde: number = 0 ) {

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
            .pipe(
              //delay(5000), // se utiliza para mostrar el tiempo que se va tardar en cargar los datos
              map(resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
                );
                return {
                  total: resp.total,
                  usuarios
                };
              })
            )
  }

  eliminarUsuario( usuario: Usuario ) {
    //usuarios/625bd5da16a5af8641651118
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }


  guardarUsuario( usuario: Usuario) {

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );
  }
}
