# S4RBOpen


# Interview Questions #

Imagine you have been tasked by the Account Manager to create a basic reporting application that will allow the account manager to view complaints via a online portal.
The company already has a public JSON REST API that stores all the complaints that the business has recieved and the number of corresponding sales in that period.

The back-end server that provides the public API can be hosted locally using the following commands:

```shell
$ npm install -g json-server

$ json-server --watch db.json
```

## 1. Develop a basic reporting portal using any suitable frameworks, such as Angular or React

![Example Reporting Portal](/example-2.png "Example Reporting Portal")

## 2. Add a view that shows the months and the calculated value CPMU

CPMU = Complaints per million units.

For example:

|Month       | CPMU|
|---------- | ----------|
|January 2012|  5.47|
|February 2012| 57.66|
|March 2012|    12.13|
|May 2012|  67.78|
|June 2012| 93.68|

## 3. Allow the ability for the user to toggle Quarter and Month aggregation

For example:

| Year |Quarter       | CPMU|
|---------- |---------- | ----------|
| 2012 |1|  7.19|
| 2012 |2|  82.69|


## 4. Within the report there are missing months when data are not available, these values should be displayed as "No Value"

For example:

|Month       | CPMU
|---------- | ----------|
|February 2012| 57.66|
|March 2012|    12.13|
|April 2012|    No Value |
|June 2012| 93.68|
|July 2012| 57.30|

## 5. Add any tests you see fit to cover your code and any key manipulations you have performed

# The Test #
Hopefully, completing the test itself shouldn’t be too difficult, but to help:
- The file `interview.xlsx` has been provided by the project manager as an example of correct calculations.
- We are looking for how you approach the project, the tests you put in place, the structure of your code etc.
- You should approach this as if it were part of much bigger interconnected project.
- The project manager is concious of the development budget, so your solution should be economical without compromising quality; there are no prizes for finishing quickly.


# Angular #

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.3.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


