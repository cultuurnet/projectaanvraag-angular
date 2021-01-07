# Development

You will need to install [Compass](http://compass-style.org/install/) on your local system.

Install other dependencies using `npm i` and then `npm run bower -- install`.

`npm run serve`
* Serves the app on http://localhost:9999
* Livereload is added to reload the browser after file changes.

`npm run build`
* Builds the app to the `dist` folder.
* This process resembles the process for production the most.

## Testing

Running `grunt test` will run the unit tests with karma.
