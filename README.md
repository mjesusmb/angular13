
# Development environment
This project uses **Angular v13.3** with **NodeJS v16.13.2** and **npm >=6.4.1**.
Guide to setup the development environment: [Canigó 3.6-CloudNative - Workarea win10](https://setools.t-systems.es/confluence/display/GAG/%5BCanigo3.6-CloudNative%5D+Workarea+win10+internacional+i+projectes+base?src=contextnavpagetreemode#id-%5BCanigo3.6-CloudNative%5DWorkareawin10internacionaliprojectesbase-Certificatsnecessaris%28cacerts%20JKS%29).

## Visual Studio Code

In **Visual Studio Code** install the following extensions:

- Angular Essentials (Version 16)

- Angular Language Service

- Angular Snippets (Version 16)

- Auto Close Tag

- XML Tools

- Auto Import

- EsLint

- Material Icon Theme

- NPM-Scripts

- Prettier - Code formatter

  

# justicia-ng

  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

  

## Development server

  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

  

## Code scaffolding

  

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

  

## Build

  

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

  

## Running unit tests

  

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  

## Running end-to-end tests

  

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

  

## Further help

  

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

  
  
  

Project based on https://setools.t-systems.es/gitlab/justicia/arq-can/arq-can3.6_ang/-/tree/main/PoC-a13

  
  ## Dockerizing the application
mvn clean package fabric8:resource fabric8:build fabric8:apply -DskipTests -Dfabric8.openshift.trimImageInContainerSpec=true