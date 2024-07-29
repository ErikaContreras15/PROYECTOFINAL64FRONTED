import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { AppRoutingModule } from './app-routing.module.ts'; // Importa el módulo de enrutamiento
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';  // Importar RouterModule
import { RegistroComponent } from './componente/Registro/registro.component';
import { LoginComponent } from './componente/login/login.component';
import { ActualizarClienteComponent } from './componente/actualizar-cliente/actualizar-cliente.component';
import { LibroComponent } from './componente/libro/libro.component';
import { PrestamoComponent } from './componente/prestamo/prestamo.component';
import { ListarPrestamosComponent } from './componente/lista-prestamo/lista-prestamo.component';
import { HistorialComponent } from './componente/historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    ActualizarClienteComponent,
    LibroComponent,
    PrestamoComponent,
    ListarPrestamosComponent,
    HistorialComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule // Agrega el módulo de enrutamiento
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }