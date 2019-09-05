import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emprendimiento } from '../../models/emprendimiento';
import { CargaImagenesService } from '../../services/carga-imagenes.service';


@Component({
  selector: 'app-ver-emprendimiento',
  templateUrl: './ver-emprendimiento.component.html',
  styles: []
})
export class VerEmprendimientoComponent implements OnInit {

  id: number;
  emprendimiento: Emprendimiento;
  loading: boolean;

  constructor( private activatedRoute: ActivatedRoute, private cargaImagenesService: CargaImagenesService ) {
    this.loading = true;
    this.activatedRoute.params.subscribe( data => {
      this.cargaImagenesService.verEmprendimiento( data.id ).subscribe( (data: any) => {
        console.log(data[0]);
        this.emprendimiento = data[0];
        
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });

    });
  }

  ngOnInit() {
  }

}
