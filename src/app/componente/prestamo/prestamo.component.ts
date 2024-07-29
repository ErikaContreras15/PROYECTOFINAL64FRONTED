

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { PrestamoService } from 'src/app/servicio/Prestamo/prestamo.service';
import { PrestamoService } from '../../servicio/Prestamo/prestamo.service';
//import { LibroService } from 'src/app/servicio/Libro/libro.service';
import { LibroService } from '../../servicio/Libro/libro.service';
//import { Prestamo } from 'src/app/clase/Prestamo/prestamo';
import { Prestamo } from '../../clase/Prestamo/prestamo';
//import { Libro } from 'src/app/clase/Libro/libro';
import { Libro } from '../../clase/Libro/libro';
@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  libroId: number | null = null;
  titulo: string | null = null;
  link: string = '';
  autor: string | null = null;
  isbn: string | null = null;
  anioPublicacion: number | null = null;
  estado: number | null = null;
  monto: number | null = null;
  usuarioId: number | null = null;

  prestamo: Prestamo = new Prestamo();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prestamoService: PrestamoService,
    private libroService: LibroService
  ) { 
    // Inicializa el estado del préstamo a 2 por defecto
    this.prestamo.estado = 2;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.libroId = +params['id']; // Asegúrate de convertir el parámetro 'id' a número
      this.titulo = params['titulo'];
      this.autor = params['autor'];
      this.isbn = params['isbn'];
      this.monto = +params['monto'];
      this.anioPublicacion = +params['anioPublicacion'];
      this.estado = +params['estado'];
      this.link = sessionStorage.getItem("link") || '';
    });

    // Obtener el ID del usuario desde sessionStorage
    this.usuarioId = parseInt(sessionStorage.getItem("UsuarioID") || '0', 10);

    console.log('ID del libro:', this.libroId);
    console.log('ID del usuario:', this.usuarioId);

    if (this.libroId === null || this.usuarioId === null) {
      console.error('ID del libro o del usuario no válido.');
      // Maneja el error según sea necesario
    }
  }

  onSubmit(): void {
    if (this.libroId !== null && this.usuarioId !== null) {
      this.prestamo.libro = this.libroId;
      this.prestamo.usuario = this.usuarioId;
      
      // Verificar que los campos se están capturando correctamente
      console.log('Monto:', this.prestamo.monto);
      console.log('Días:', this.prestamo.dias);
      
      // Asegúrate de que los campos tengan valores válidos
      if (!this.prestamo.dias || !this.prestamo.estado) {
        console.error('Campos del préstamo incompletos.');
        return;
      }

      this.prestamoService.createPrestamo(this.prestamo, this.link).subscribe(
        response => {
          console.log('Préstamo creado con éxito:', response);
          // Actualiza el estado del libro si es necesario
          this.updateLibroEstado(this.libroId);
          this.router.navigate(['/menu']); // Redirige a otra página si es necesario
        },
        error => {
          console.error('Error al crear el préstamo:', error);
        }
      );
    } else {
      console.error('Datos insuficientes para crear el préstamo.');
    }
  }

  updateLibroEstado(libroId: number): void {
    // Obtener todos los detalles del libro para mantener el formato adecuado
    this.libroService.getLibroById(libroId, this.link).subscribe(
      libro => {
        const updatedLibro: Libro = {
          id: libro.id,
          titulo: libro.titulo,
          autor: libro.autor,
          isbn: libro.isbn,
          monto: libro.monto,
          anioPublicacion: libro.anioPublicacion,
          estado: 2 // Actualiza solo el estado
        };

        this.prestamoService.updateLibro(updatedLibro, this.link).subscribe(
          response => {
            console.log('Libro actualizado con éxito:', response);
          },
          error => {
            console.error('Error al actualizar el libro:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener el libro:', error);
      }
    );
  }
  navigateToActualizarCliente() {
    this.router.navigate(['/actualizar-cliente']);
  }
  cerrarSesion() {
    sessionStorage.clear(); // Limpiar todos los datos de sesión
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}

