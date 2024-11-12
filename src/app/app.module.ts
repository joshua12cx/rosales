import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './modal/dashboard/dashboard.component';
import { PacientesComponent } from './modal/pacientes/pacientes.component';
import { CitasComponent } from './modal/citas/citas.component';
import { PagosComponent } from './modal/pagos/pagos.component';
import { AjustesComponent } from './modal/ajustes/ajustes.component';
import { PacienteModalComponent } from './modal/pacientes/paciente-modal/paciente-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { HistoriasComponent } from './modal/historias/historias.component';
import { AgendaComponent } from './modal/agenda/agenda.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    PacientesComponent,
    CitasComponent,
    PagosComponent,
    AjustesComponent,
    PacienteModalComponent,
    ModalComponent,
    HistoriasComponent,
    AgendaComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
