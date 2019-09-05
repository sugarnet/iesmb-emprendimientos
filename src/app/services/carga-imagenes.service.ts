import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
import { Emprendimiento } from '../models/emprendimiento';
import { Imagen } from '../models/imagen';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';
  private CARPETA_DATA = 'data';
  private itemsCollection: AngularFirestoreCollection<Emprendimiento>;
  private url = 'https://emprendimientos-iesmb.firebaseio.com/';

  constructor( private db: AngularFirestore,  private http: HttpClient ) {
    this.itemsCollection = this.db.collection<Emprendimiento>('data');
  }

  asociarImgs(emprendimiento: Emprendimiento, archivos: FileItem[]) {
    const storageRef = firebase.storage().ref();
    let images: Imagen[] = [];
    let filesProcessing = 0;

    for (const item of archivos) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }
      
      const uploadTask: firebase.storage.UploadTask =
      storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
      .put( item.archivo );
      
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.log('Error al subir', error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then( data => {
            filesProcessing++;
            item.estaSubiendo = false;
            item.url = data;
            images.push({name: item.nombreArchivo, url: item.url});


            if ( archivos.length === filesProcessing ) {
              emprendimiento.images = images;
                this.guardarData(
                  {
                    id: this.db.createId(),
                    title: emprendimiento.title,
                    description: emprendimiento.description,
                    images: emprendimiento.images
                  });
                // this.crearEmprendimiento(emprendimiento);
            }
          } );
        });
    }
  }

  guardarData( emprendimiento: { id: string, title: string, description: string, images: {name: string, url: string}[] } ) {
    // return this.db.collection(`/${ this.CARPETA_DATA }`).add( emprendimiento );
    return this.itemsCollection.doc(emprendimiento.id).set(emprendimiento);
  }
  // guardarData( emprendimiento: Emprendimiento ) {
  //   return this.db.collection(`/${ this.CARPETA_DATA }`).add( emprendimiento );
  // }

  cargarImagenes() {
    // return this.itemsCollection.valueChanges().pipe( map( this.crearArreglo ) );
    return this.itemsCollection.valueChanges();
  }

  private crearArreglo( emprendimientosObj: object ) {
    const emprendimientos: Emprendimiento[] = [];

    if(emprendimientosObj === null) {
      return [];
    }
    console.log(emprendimientosObj);
    Object.keys( emprendimientosObj ).forEach( key => {

      const emprendimiento = emprendimientosObj[key];
      emprendimiento.id = key;

      emprendimientos.push(emprendimiento);
    } );

    return emprendimientos;
  }

  crearEmprendimiento( emprendimiento: Emprendimiento ) {
    console.log(emprendimiento);

    return this.http.post(`${ environment.firebase.databaseURL }/data.json`, emprendimiento)
            .pipe( map( (response: any) => {
              console.log(response);
              emprendimiento.id = response.name;
              return emprendimiento;
            } ) );
  }

  verEmprendimiento(id: string) {
    return this.db.collection('data', ref => ref.where('id', '==', id)).valueChanges();
  }

  // crearEmprendimiento( emprendimiento: Emprendimiento ) {

  //   return this.http.post(`${this.url}/heroes.json`, emprendimiento)
  //           .pipe( map( (response: any) => {
  //             heroe.id = response.name;
  //             return heroe;
  //           } ) );
  // }
}
