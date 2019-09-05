import { Component } from '@angular/core';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { Emprendimiento } from '../../models/emprendimiento';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent {

  emprendimientos: Emprendimiento[] = [];

  constructor( private cargarImagenesService: CargaImagenesService, private router: Router) {
    this.cargarImagenesService.cargarImagenes().subscribe((data: any) => {
      console.log(data);
      this.emprendimientos = data;
    });
  }

  ver(id: string) {
    this.router.navigate(['ver', id]);
  }
}
