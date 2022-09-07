import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li{
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises  : Country[] = [];
  paisesSugeridos   : Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private PaisService: PaisService ) { }

  buscar( termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;
    
        this.PaisService.buscarPais( this.termino )
             .subscribe({  
              next: (data) => { this.paises = data; console.log(data); }, 
              error: () => { this.hayError = true; this.paises = []; } });
      }

      sugerencias( termino:string ){
        this.hayError = false;
        this.termino = termino;
        this.mostrarSugerencias = true;
        
        this.PaisService.buscarPais( termino )
          .subscribe({
            next: (paises) => {this.paisesSugeridos = paises.splice(0,5)},
            error: ()      => {this.paisesSugeridos = []; this.hayError= true;}});


        //TODO: Crear sugerencias.
      }
    // console.log(this.termino);
    //DEPRECATED
    // this.PaisService.buscarPais( this.termino )
    //     .subscribe( (paises) =>{
    //       console.log(paises);


    //     }, (err) => {
    //       this.hayError = true;
    //       this.paises = [];
    //     });


buscarSugerido( termino: string) {
  this.buscar(termino);
}

}
