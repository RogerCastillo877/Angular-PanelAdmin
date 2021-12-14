# PanelAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Creation of project structure

ng new panelAdmin

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Components

ng g c auth/login --skipTests -is 
ng g c auth/register --skipTests -is 
ng g c pages/nopagefound --skipTests -is
ng g c pages/dashboard --skipTests -is
ng g c shared/breadcrumbs --skipTests -is
ng g c shared/sidebar --skipTests -is
ng g c shared/header --skipTests -i

## Set the theme

Import all the libraries and paste in index all archives that you need to run the project properly.
(Theme from: https://www.wrappixel.com/templates/category/dashboard-templates/)
Copy and paste all the elements of themplate that you will use.

## Creation of routes

ng g m appRouting --flat

Generate routes in this module, import AppRoutingModule in app.module and add router-outlet in app.component

### And add others components
ng g c pages/progress -is --skipTests
ng g c pages/graphic1 -is --skipTests

## Secondary routes

ng g c pages/pages --flat --skipTests -is

Put all pages whit same template in children routes, outside others with diferent caracteristics

### Other components

Copy template of register and set styles.
