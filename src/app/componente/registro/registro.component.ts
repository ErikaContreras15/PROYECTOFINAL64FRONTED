/*import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

}*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Usuario } from 'src/app/clase/Usuarios/usuario';
import { Usuario } from '../../clase/Usuarios/usuario';
//import { RegistrarseService, CreateUsuarioResponse } from 'src/app/servicio/Registro/registro.service';
import { RegistrarseService,CreateUsuarioResponse } from '../../servicio/Registro/registro.service';
//import { ClienteService } from 'src/app/servicio/Cliente/cliente.service';
import { ClienteService } from '../../servicio/Cliente/cliente.service';
//import { Cliente } from 'src/app/clase/Cliente/cliente';  // Asegúrate de importar la clase Cliente
import { Cliente } from '../../clase/Cliente/cliente';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  link: any = "";
  usuario: Usuario = new Usuario();
  cliente: Cliente = new Cliente();  // Usa la clase Cliente aquí

  constructor(private router: Router, private registrarse: RegistrarseService, private clienteService: ClienteService) { }

  navigateToRegistro() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.link = sessionStorage.getItem("link");
  }

  crearUsuario() {
    this.registrarse.crearUsu(this.usuario, this.link).subscribe(
      (response: CreateUsuarioResponse) => {
        let userId: number = Number(response.id);  // Convierte el ID a número
        if (!isNaN(userId)) {
          alert(`Se creó una cuenta con ID: ${userId}`);
          sessionStorage.setItem('userId', userId.toString());  // Guarda el ID como string para la sesión
          this.cliente.usuario = userId;  // Asigna el ID directamente como número
          this.clienteService.crearCliente(this.cliente, this.link).subscribe(
            data => {
              alert("Cliente creado exitosamente");
              // Aquí puedes redirigir a otra página o realizar otras acciones
            },
            error => {
              alert("Error al crear el cliente");
            }
          );
        } else {
          alert("ID de usuario inválido");
        }
      },
      error => {
        alert("Usuario ya creado");
        this.router.navigate(['/login']);
      }
    );
  }
}