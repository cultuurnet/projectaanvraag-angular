# Unit tests

Unit tests are done with [Jasmine](http://jasmine.github.io).
All tests are written in the 'test' directory. For tests, the same directory structure should be used as the file you are testing.

Running `grunt test` or `grunt karma`will run the unit tests with [karma](https://karma-runner.github.io).

## Test coverage
 A test coverage report is generated when `grunt karma` is run. This can be found inside the `coverage` folder.

The test coverage percentage should be as high as possible.

## Test specificity
 Tests should be written to be granular. Only test functionality in one layer of the application. Spy objects can be used to separate dependencies.

E.g:

* In a compnent controller, only test what happens in the controller. Create a Spy object for the service and its used methods, that resolve or reject what is expected.
* Use the `$httpBackend` object to fake the calls in the services to the Silex API.