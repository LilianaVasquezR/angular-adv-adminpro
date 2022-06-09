import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input('valor') progreso: number = 40; //  'valor' es para renombrar el argumento
  @Input() btnClass: string = 'btn-primary';


  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter(); //  EventEmitter<number> se necesita especificar cual la informacion que fluye atraves de el
  
  cambiarValor( valor: number ) {
     // validacion para el incremento del boton es mayor
     if ( this.progreso >= 100 && valor >= 0 ) {
        this.valorSalida.emit(100);
        this.progreso = 100;
        return;
    }
    
    // validacion para el incremento del boton es menor
    if ( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      this.progreso = 0;
      return;
    }
    //para incrementar o disminuir el valor de la barra  con los botones
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

  }

onChange( nuevoValor: number ) {
  
  if( nuevoValor >= 100 ){
    this.progreso = 100;
  } else if ( nuevoValor <= 0 ) {
    this.progreso = 0;
  } else {
    this.progreso = nuevoValor;
  }

  this.valorSalida.emit( this.progreso);
}

}
