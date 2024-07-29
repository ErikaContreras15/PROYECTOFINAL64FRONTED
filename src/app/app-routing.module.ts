import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componente/Registro/registro.component';
import { LoginComponent } from './componente/login/login.component';
import { MenuComponent } from './componente/menu/menu.component';
import { ActualizarClienteComponent } from './componente/actualizar-cliente/actualizar-cliente.component';
import { LibroComponent } from './componente/libro/libro.component';
import { FormsModule } from '@angular/forms'; // Ajusta la ruta según tu estructura
import { PrestamoComponent } from './componente/prestamo/prestamo.component';
import { ListarPrestamosComponent } from './componente/lista-prestamo/lista-prestamo.component';
import { HistorialComponent } from './componente/historial/historial.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'registro', component:RegistroComponent},
  {path: 'menu', component:MenuComponent}, // Ruta por defecto
  {path: 'actualizar-cliente', component:ActualizarClienteComponent}, // Ruta por defecto
  {path: 'libro', component:LibroComponent},
  {path: 'prestamo', component:PrestamoComponent},
  {path: 'lista-prestamo', component:ListarPrestamosComponent},
  {path: 'historial', component:HistorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,FormsModule]
})
export class AppRoutingModule { }