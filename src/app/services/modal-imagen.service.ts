import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _OcultarModal: boolean = true; // el guion bajo es un entandar para indicar que la propiedad es privada
  public tipo!: 'usuarios'|'medicos'|'hospitales' ;// se agrega !  por la version del angular
  public id!: string;
  public img!: string;

  public nuevaImagen: EventEmitter<string>= new EventEmitter<string>();

  get ocultarModal() {
    return this._OcultarModal;
  }
  // metodo para abrir el modal
  abrirModal(
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string,
    img: string = 'no-img'
  ) {
    this._OcultarModal = false;
    this.tipo = tipo;
    this.id = id;
    //http://localhost:3000/api/upload/usuarios/no-image
    if ( img.includes('https') ) {
      this.img = img;
    } else {
      this.img = `${ base_url }/upload/${ tipo }/${ img }`;
    }

    //this.img = img;
  }

  cerrarModal() {
    this._OcultarModal = true;
  }


  constructor() { }
}
