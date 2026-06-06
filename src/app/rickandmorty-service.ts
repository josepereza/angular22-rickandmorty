import { httpResource } from '@angular/common/http';
import { Injectable, inject, signal, computed, debounced } from '@angular/core';

// Interfaz para tipar la respuesta de la API
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
}

export interface RickAndMortyResponse {
  results: Character[];
}

@Injectable({providedIn: 'root'})
export class RickandmortyService {
 // El estado del término de búsqueda vive en el servicio
  readonly searchQuery = signal<string>('');

debouncedQuery = debounced(this.searchQuery, 500);  //debounce de 500ms para evitar demasiadas llamadas a la API mientras el usuario escribe  
 // debounded esta en forma experimental, es una función que toma una signal y un tiempo de espera, y devuelve una nueva signal que solo se actualiza después de que la señal original ha dejado de cambiar durante el tiempo especificado. Esto es útil para optimizar llamadas a APIs o procesos costosos que no necesitan ejecutarse con cada cambio inmediato.
// El recurso HTTP reacciona automáticamente a 'searchQuery'
  readonly charactersResource = httpResource<RickAndMortyResponse>(() => {
    const query = this.debouncedQuery.value();
    return `https://rickandmortyapi.com/api/character/?name=${query}`;
  });

  // Método público para actualizar el término de búsqueda
  updateSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }
}




// Este codigo de abajo  es lo que habria que hacer si no tuvieramos el signal debounced, que es una función experimental que Angular ha introducido para facilitar el manejo de casos como este sin tener que implementar manualmente la lógica de debounce con setTimeout y clearTimeout.
 
/*
// 1. Este cambia INMEDIATAMENTE con cada letra que escribe el usuario
readonly searchQuery = signal<string>('');
  
  // 2. Este solo cambiará cuando el usuario pare de escribir
  readonly debouncedQuery = signal<string>('');

  constructor() {
    // 3. Creamos un efecto que escucha a 'searchQuery' y retrasa la actualización de 'debouncedQuery'
    effect((onCleanup) => {
      const currentQuery = this.searchQuery();
      
      // Configuramos el temporizador (ej. 400 milisegundos)
      const timeoutId = setTimeout(() => {
        this.debouncedQuery.set(currentQuery);
      }, 400);

      // ¡CRUCIAL! Si el usuario escribe otra letra antes de los 400ms, 
      // Angular ejecuta 'onCleanup' y cancelamos el temporizador anterior.
      onCleanup(() => clearTimeout(timeoutId));
    });
  }

  // 4. El httpResource ahora observa a 'debouncedQuery' en lugar de 'searchQuery'
  readonly charactersResource = httpResource<RickAndMortyResponse>(() => {
    const query = this.debouncedQuery(); // <- Magia aquí
    return `https://rickandmortyapi.com/api/character/?name=${query}`;
  });
    
  */
