import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RickandmortyService } from './rickandmorty-service';
import { NgClass } from '@angular/common';

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
  imports: [ NgClass],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('angular22-rickandmorty');
  
 /* SIN SERVICIO
 
 // Signal para almacenar el texto de búsqueda
  searchQuery = signal<string>('');

  // httpResource que reacciona automáticamente cuando 'searchQuery' cambia
  charactersResource = httpResource<RickAndMortyResponse>(() => {
    const query = this.searchQuery();
    // Si el buscador está vacío, puedes decidir no traer nada o traer la lista inicial
    const url = `https://rickandmortyapi.com/api/character/?name=${query}`;
    return url;
  });

  // Método para manejar el input del usuario
  onSearch(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.searchQuery.set(element.value);
  } */



    // CON SERVICIO

    // Inyectamos el servicio usando la función inject() nativa de Angular
  private rmService = inject(RickandmortyService);

  // Exponemos el recurso y el query al HTML exponiendo las propiedades del servicio
  charactersResource = this.rmService.charactersResource;
  searchQuery = this.rmService.searchQuery;

  // Manejador del evento input
  onSearch(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.rmService.updateSearchQuery(element.value);
  }
}
