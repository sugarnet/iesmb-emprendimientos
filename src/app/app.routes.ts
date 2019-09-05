import { Routes, RouterModule } from '@angular/router';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { VerEmprendimientoComponent } from './components/ver-emprendimiento/ver-emprendimiento.component';


const RUTAS: Routes = [
    {path: 'fotos', component: FotosComponent},
    {path: 'carga', component: CargaComponent},
    {path: 'ver/:id', component: VerEmprendimientoComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'fotos'}
];

export const APP_ROUTES = RouterModule.forRoot( RUTAS );
