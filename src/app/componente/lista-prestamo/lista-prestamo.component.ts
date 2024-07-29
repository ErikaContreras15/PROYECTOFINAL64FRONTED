/*import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-prestamo',
  standalone: true,
  imports: [],
  templateUrl: './lista-prestamo.component.html',
  styleUrl: './lista-prestamo.component.scss'
})
export class ListaPrestamoComponent {

}*/

import { Component, OnInit } from '@angular/core';
import { Prestamo } from 'src/app/clase/Prestamo/prestamo';
import { ListaPrestamoService } from 'src/app/servicio/PrestamosUsuario/lista-prestamo.service';
import { LibroService } from 'src/app/servicio/Libro/libro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-prestamos',
  templateUrl: './lista-prestamo.component.html',
  styleUrls: ['./lista-prestamo.component.css']
})
export class ListarPrestamosComponent implements OnInit {
  prestamos: Prestamo[] = [];
  userId: string | null = null;
  link: string = '';

  constructor(private listaPrestamoService: ListaPrestamoService,private ruta: Router, private libroService: LibroService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("UsuarioID");
    this.link = sessionStorage.getItem("link") || '';
    if (this.userId) {
      this.listaPrestamoService.getPrestamosByUsuario(this.userId, this.link).subscribe(
        data => {
          this.prestamos = data.filter(prestamo => prestamo.estado === 2); // Filtrar por estado 2
          console.log('Préstamos:', this.prestamos);
          this.prestamos.forEach(prestamo => {
            this.listaPrestamoService.getLibroById(prestamo.libro, this.link).subscribe(libro => {
              prestamo['libroDetalles'] = libro;
            });
          });
        },
        error => {
          console.error('Error al obtener los préstamos:', error);
        }
      );
    } else {
      console.error('No se encontró un ID de usuario válido.');
    }
  }

  devolverLibro(prestamo: Prestamo): void {
    if (confirm("¿Está seguro que desea devolver este libro?")) {
        // Actualizar estado del libro
        this.libroService.getLibroById(prestamo.libro, this.link).subscribe(libro => {
            libro.estado = 1;  // Actualizar estado a 1 (disponible)
            this.libroService.updateLibro(libro.id, libro, this.link).subscribe(() => {
                console.log('Estado del libro actualizado');

                // Actualizar estado del préstamo
                const prestamoUpdate = { estado: 1 };  // Solo enviar el estado
                this.listaPrestamoService.updatePrestamo(prestamo.id, prestamoUpdate, this.link).subscribe(
                    () => {
                        console.log('Estado del préstamo actualizado');
                        // Opcionalmente, actualizar la lista de préstamos
                        this.ngOnInit();
                    },
                    error => {
                        console.error('Error al actualizar el préstamo:', error);
                    }
                );
            }, error => {
                console.error('Error al actualizar el libro:', error);
            });
        }, error => {
            console.error('Error al obtener el libro:', error);
        });
    }
  }
  navigateToActualizarCliente() {
    this.ruta.navigate(['/actualizar-cliente']);
  }
  cerrarSesion() {
    sessionStorage.clear(); // Limpiar todos los datos de sesión
    this.ruta.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}



