import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    subirImagen() {
      const id = this.modalImagenService.id;
      const tipo = this.modalImagenService.tipo;

      this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id)
       .then(img => {
       Swal.fire('Guardador', 'Imagen de usuario actualizada', 'success');

       this.modalImagenService.nuevaImagen.emit(img);

       this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
       });
  
    }


}
