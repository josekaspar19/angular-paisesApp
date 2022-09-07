import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button{
      margin-right: 5px;
    }
    `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private PaisService: PaisService) { }

  getClaseCSS( region: string ): string {
    return region === this.regionActiva ? 'btn btn-primary': 'btn btn-outline-primary';
  }


  activarRegion( region: string) {

    if(region === this.regionActiva) { return;}
    
    this.regionActiva = region;
    this.paises = [];

    //TODO: hacer el llamado al servicio
    this.PaisService.buscarRegion(region)
      .subscribe({  
      next: (data) => { this.paises = data; }, 
      error: () => { this.paises = []; } });
  }

}
