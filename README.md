# Angular22Rickandmorty

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

## 2 Ramas o branches.
### Gestión del Rendimiento y Detección de Cambios (Change Detection)

* 1 Rama: El enfoque tradicional (onSearch(event)):
Cada vez que el usuario presiona una tecla, se dispara un evento del DOM, se ejecuta tu función, se llama al servicio y, por defecto en Angular clásico (con Zone.js), se activa la detección de cambios en todo el componente o incluso en toda la aplicación. Si no se usa OnPush, Angular re-renderiza partes innecesarias para comprobar qué cambió.

* 2 Rama: El enfoque con Signals:
Las Signals introducen reactividad fina (fine-grained reactivity). Angular sabe exactamente qué parte del template depende de la señal searchQuery. Cuando la señal cambia, Angular actualiza únicamente el nodo del DOM que cambió (el input y la lista filtrada), sin necesidad de escanear todo el árbol de componentes. En Angular 22 (que camina hacia aplicaciones Zoneless), las señales son la única forma de lograr este rendimiento óptimo.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# angular22-rickandmorty
