## Root File structure

## App
 Contains all the files that make up the application. You should work in this directory.
 Most directory names are self-explanatory.
 
 ## Index.html
 This main HTML file ties the app together. It provides the main `ui-view` which includes child views. All javascript files need to be included here. Bower_components are add by bower. Every script file you add to the app should also be added to this file.

---
## Scripts
 Contains all the javascript files. The files are grouped together conceptually as [modules](angular_module_structure.md).
 
 The folder _passholder_ contains all the files that deal with the passholder. Subfolders are used for large fractions of functionality.

### Special script files
* `app.js`: The main angular module. Injects all other modules. Contains general ui-router states. Every module you add should be added as a dependency to this module.
* `config.js`: Is generated during `grunt build` and filled with the configuration data from `config.dist.json` or `config.json`

---
## Styles
 Contains all the [Sass](http://sass-lang.com) .scss files for styling.
 
 Read more about [styling and markup](../development/styling_and_markup.md).

---
## Views
 Contains all the template files used in the app states.
 
 Template file names should be as self-explanatory as possible.
 
# Angular structure

This is a small application. So all code is written in 1 module.

## Types

## [Services](https://docs.angularjs.org/guide/services)
 Contain either:
 
- Logic to communicate with the Silex API using a callback documented in the swagger file
- Functionality to persist data between multiple controllers
- Should be stored in the scripts/services directory with the name {name}.service.js.

## [Controllers](https://docs.angularjs.org/guide/controller)
Controllers should be used if no component exists for a certain part (example: root application) 

Controllers never:

- Communicate directly with the Silex API
- Access data in $scope or $rootScope
- Inject markup

Controllers should be stored in the scripts/controllers directory with the name {name}.controller.js.

## [Components](https://docs.angularjs.org/guide/components)
 
 Components are used for logic that will insert new markup. It is also used to let the page load the correct view
 using the ui router.
 
 Components should be stored in the scripts/components directory with the name {name}.component.js.

## [Constants](http://twofuckingdevelopers.com/2014/06/angularjs-best-practices-001-constants)
 Constants are used for fixed information structures that need to be used in several places of the app.
 
 Constants should be stored in the scripts/constants directory with the name {name}.constant.js.
 
## [Factories](https://docs.angularjs.org/guide/providers#factory-recipe)
 Factories are used in the project to create new instances of common objects like projects, organisations, ...
 
 Factories should be stored in the scripts/constants directory with the name {name}.factory.js.
 