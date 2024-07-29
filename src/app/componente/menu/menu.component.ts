/*import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}*/

// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ListaPrestamoService } from 'src/app/servicio/PrestamosUsuario/lista-prestamo.service';
import { ListaPrestamoService } from '../../servicio/PrestamosUsuario/lista-prestamo.service';
//import { CorreoService } from 'src/app/servicio/correo/correo.service'; // Asegúrate de importar tu servicio de email
import { CorreoService } from '../../servicio/correo/correo.service';
//import { Prestamo } from 'src/app/clase/Prestamo/prestamo';
import { Prestamo } from '../../clase/Prestamo/prestamo';
//import { Libro } from 'src/app/clase/Libro/libro';
import { Libro } from '../../clase/Libro/libro';







@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username: string | null = null;
  userId: string | null = null;
  userEmail: string | null = null;
  link: string = '';

  constructor(private ruta: Router, private listaPrestamoService: ListaPrestamoService, private emailService: CorreoService) { }

  ngOnInit(): void {
    // Recuperar datos del sessionStorage
    this.username = sessionStorage.getItem("Usuario");
    this.userId = sessionStorage.getItem("UsuarioID");
    this.userEmail = sessionStorage.getItem("UsuarioCorreo"); // Obtener el correo electrónico del usuario
    this.link = sessionStorage.getItem("link") || '';

    // Verificar préstamos caducados
    if (this.userId) {
      this.listaPrestamoService.getPrestamosByUsuarioCaducados(this.userId, this.link).subscribe(
        (prestamos: Prestamo[]) => {
          if (prestamos.length > 0) {
            alert('Tienes préstamos caducados');
            this.enviarCorreoPrestamosCaducados(prestamos);
          }
        },
        error => {
          console.error('Error al verificar préstamos caducados:', error);
        }
      );
    }
  }

  enviarCorreoPrestamosCaducados(prestamos: Prestamo[]) {
    prestamos.forEach(prestamo => {
      this.listaPrestamoService.getLibroById(prestamo.libro, this.link).subscribe(
        (libro: Libro) => {
          const toEmail = this.userEmail; // Usar el correo electrónico del usuario
          const subject = "Notificación de Préstamo Caducado";
          const message = `Estimado usuario, el siguiente préstamo ha caducado:\n\n
                           Título del libro: ${libro.titulo}\n
                           Autor: ${libro.autor}\n
                           ISBN: ${libro.isbn}\n
                           Fecha de préstamo: ${prestamo.fechaInicio}\n
                           Fecha de devolución: ${prestamo.fechaFin}\n\n
                           Por favor, devuelva el libro lo antes posible.`;

          this.emailService.sendEmail(toEmail, subject, message).then(response => {
            console.log('Correo enviado exitosamente', response.status, response.text);
          }).catch(error => {
            console.error('Error al enviar el correo', error);
          });
        },
        error => {
          console.error('Error al obtener los detalles del libro', error);
        }
      );
    });
  }

  navigateToActualizarCliente() {
    this.ruta.navigate(['/actualizar-cliente']);
  }
  cerrarSesion() {
    sessionStorage.clear(); // Limpiar todos los datos de sesión
    this.ruta.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}

