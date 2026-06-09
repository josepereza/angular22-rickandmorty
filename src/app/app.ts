import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RickandmortyService } from './rickandmorty-service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaz básica para tipar la respuesta de la API
interface RickAndMortyResponse {
  results: Array<{
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    location: { name: string };
  }>;
}
@Component({
  selector: 'app-root',
  imports: [ NgClass,FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('angular22-rickandmorty');
  
 /* SIN SERVICIO
 
// 1. Signal que almacena el texto de búsqueda
  searchQuery = signal<string>('');

  // 2. El recurso HTTP reacciona automáticamente cada vez que 'searchQuery' cambia
  charactersResource = httpResource<RickAndMortyResponse>(() => {
    const query = this.searchQuery();
    return `https://rickandmortyapi.com/api/character/?name=${query}`;
  }); */



    // CON SERVICIO

  
  // 1. Inyectamos el servicio
  private rmService = inject(RickandmortyService);

  // 2. Exponemos los recursos necesarios directamente al template
  charactersResource = this.rmService.charactersResource;
  searchQuery = this.rmService.searchQuery;

  // 3. Método limpio: Cero manipulación del DOM nativo o 'Event'
  updateSearch(value: string): void {
    this.rmService.updateSearchQuery(value);
  }
}
