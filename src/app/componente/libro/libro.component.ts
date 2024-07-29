/*import { Component } from '@angular/core';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.scss'
})
export class LibroComponent {

}*/


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Libro } from 'src/app/clase/Libro/libro';
import { Libro } from '../../clase/Libro/libro';
//import { LibroService } from 'src/app/servicio/Libro/libro.service';
import { LibroService } from '../../servicio/Libro/libro.service';
//import { PrestamoService } from 'src/app/servicio/Prestamo/prestamo.service';
import { PrestamoService } from '../../servicio/Prestamo/prestamo.service';


@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  libros: Libro[] = [];
  filteredLibros: Libro[] = [];
  search = {
    titulo: '',
    autor: '',
    isbn: '',
    anioPublicacion: null,
    monto: null
  };
  selectedLibroId: number | null = null;
  link: string = '';
  username: string | null = null;
  userId: string | null = null;

  constructor(private libroService: LibroService, private router: Router , private servicioPresta:PrestamoService) { }

  ngOnInit(): void {
    this.selectedLibroId = parseInt(sessionStorage.getItem('selectedLibroId') || '0', 10);
    this.link = sessionStorage.getItem("link") || '';
    this.username = sessionStorage.getItem("Usuario");
    this.userId = sessionStorage.getItem("UsuarioID");

    this.libroService.getAllLibros(this.link).subscribe(
      data => {
        this.libros = data;
        this.filteredLibros = data;
      },
      error => {
        console.error('Error al obtener los libros', error);
      }
    );
  }

  onSearch(): void {
    this.filteredLibros = this.libros.filter(libro => {
      return (!this.search.titulo || libro.titulo.toLowerCase().includes(this.search.titulo.toLowerCase())) &&
             (!this.search.autor || libro.autor.toLowerCase().includes(this.search.autor.toLowerCase())) &&
             (!this.search.isbn || libro.isbn.toLowerCase().includes(this.search.isbn.toLowerCase())) &&
             (!this.search.anioPublicacion || libro.anioPublicacion === this.search.anioPublicacion) &&
             (!this.search.monto || libro.monto === this.search.monto);
    });
  }

  onEstadoClick(libro: Libro) {
    if (libro.estado === 1) {
      sessionStorage.setItem('selectedLibroId', libro.id.toString());

      this.router.navigate(['/prestamo'], {
        queryParams: {
          id: libro.id,
          titulo: libro.titulo,
          autor: libro.autor,
          isbn: libro.isbn,
          monto :libro.monto,
          anioPublicacion: libro.anioPublicacion,
          estado: libro.estado
        }
      });
    }
  }

  navigateToActualizarCliente() {
    this.router.navigate(['/actualizar-cliente']);
  }
  cerrarSesion() {
    sessionStorage.clear(); // Limpiar todos los datos de sesión
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}



