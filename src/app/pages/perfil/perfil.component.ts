import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;  // el de ! se lo agregue para  poner que se inicalizo la porpiedad
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;


  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) { 

    this.usuario = usuarioService.usuario;
}

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ] ,
      email: [ this.usuario.email, [Validators.required, Validators.email ] ],
    });

  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe( () => {
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardador', 'Cambios fueron guardador', 'success');
        }, (err)=>{
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  cambiarImagen( evento: Event["target" ]) {
 
  let file =  (evento as HTMLInputElement).files!;
  this.imagenSubir = file[0];


  if ( !file ) { 
        this.imgTemp = null; ///cambier el retur 
        return; 
      }
  
      const reader =  new FileReader();
      reader.readAsDataURL( file[0] );
  
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }

  }


  // cambiarImagen( file: File ) {
  //   this.imagenSubir = file;

  //   if ( !file ) { 
  //     this.imgTemp = null; ///cambier el retur 
  //     return; 
  //   }

  //   const reader =  new FileReader();
  //   reader.readAsDataURL( file );

  //   reader.onloadend = () => {
  //     this.imgTemp = reader.result;
  //   }

  // }

  subirImagen() {

    this.fileUploadService
    .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
    .then(img => {
      this.usuario.img = img 
      Swal.fire('Guardador', 'Imagen de usuario actualizada', 'success');
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });

  }

}
