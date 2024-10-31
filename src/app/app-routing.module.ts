import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './modal/dashboard/dashboard.component';
import { PacientesComponent } from './modal/pacientes/pacientes.component';
import { CitasComponent } from './modal/citas/citas.component';

import { AjustesComponent } from './modal/ajustes/ajustes.component';
import { PagosComponent } from './modal/pagos/pagos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a 'login' cuando la ruta es vacía
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'ajustes', component: AjustesComponent },
    ],
  },
  { path: '**', redirectTo: 'login' } // Redirige cualquier otra ruta no definida a 'login'
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
