import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Emprendimiento } from '../../models/emprendimiento';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];

  estaSobreElemento = false;

  forma: FormGroup;

  constructor(private cargaImagenesService: CargaImagenesService ) {
    this.forma = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl()
    });
  }

  ngOnInit() {
  }

  guardar() {

    let emprendimiento = new Emprendimiento(this.forma.value['title'], this.forma.value['description']);

    this.cargaImagenesService.asociarImgs( emprendimiento, this.archivos );

  }

  limpiarArchivos() {
    this.archivos = [];
  }

  guardarCambios() {

  }

  isFieldValid(field: string) {
    return !this.forma.get(field).valid && this.forma.get(field).touched;
  }

}
