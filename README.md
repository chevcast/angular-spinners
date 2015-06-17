# angular-spinners
A library for easily adding spinners and a spinner hide/show API to your Angular application.

### Install

You can either download the library manually [here](https://raw.githubusercontent.com/codetunnel/angular-spinners/master/dist/angular-spinners.min.js). Or you can install with Bower.

> $ bower install angular-spinners

### Quick Start

Using spinners is extremely simple with this library. First make sure that your app lists `angularSpinners` as a dependency.

```javascript
var myApp = angular.module('myApp', ['angularSpinners']);
```

Once your dependency is specified then you can begin creating spinners. To do so, use the spinner directive.

```html
<div ng-controller="booksController">
  <spinner name="booksSpinner" img-src="spinner.gif"></spinner>
  <h3 ng-show="!books">No books.</h3>
  <ul ng-show="books">
    <li ng-repeat="book in books">{{book.title}}</li>
  </ul>
  <button ng-show="!books" ng-click="loadBooks();">Load Books</button>
</div>
```

Then in your app you can inject the spinner service wherever you need it.

```javascript
myApp.controller('booksController', function ($scope, $http, spinnerService) {
  $scope.loadBooks = function () {
    spinnerService.show('booksSpinner');
    $http.get('/api/books')
      .success(function (books) {
        $scope.books = books;
      })
      .catch(function (err) {
        console.error(err);
      })
      .finally(function () {
        spinnerService.hide('booksSpinner');
      });
  };
});
```

A working demo can be found here: http://codepen.io/Chevex/pen/bdrxqb

---

### Spinner Directive

Several options are available and you specify them as attributes on your directives. The directive can be used as a standalone element or as an attribute.

#### name

The name attribute is required if the `register` option is `true`. It is what you must pass to the service when trying to show/hide that specific spinner.

```html
<spinner name="mySpinner"></spinner>
```

#### group

Optionally a group name may be specified so that you can show/hide groups of spinners.

```html
<spinner name="mySpinner" group="foo"></spinner>
```

#### show

By default all spinners are hidden when first registered. You can change set a spinner to be visible by default by setting the `show` option.

```html
<spinner name="mySpinner" show="true"></spinner>
```

#### imgSrc

There won't be anything to show if the spinner doesn't have a link to a loading graphic or some embedded markup to be displayed. You can specify an image using the `imgSrc` option.

```html
<spinner name="mySpinner" img-src="/path/to/loading.gif"></spinner>
```

If you want to disable the loading image entirely then simply do not specify the `img-src` attribute and an image won't be used. If you don't include the `imgSrc` option then be sure to specify some custom markup within the spinner directive itself so it can be used instead.

#### register

By default all spinners register themselves with the spinner service. If for some reason you don't want this to happen, simply set `register` to `false`.

```html
<spinner name="mySpinner" register="false"></spinner>
```

If you do this then you'll want to manually get reference to that spinner's API so you can talk to it directly in order to hide/show it. You can do that with the `onRegister` option below.

#### onRegister

Sometimes you need to know when a spinner is loaded and registered with the spinner service. To be notified of this simpy supply an an Angular expression to the `onRegister` option.

```html
<spinner name="mySpinner" on-register="spinnerLoaded(spinnerApi);"></spinner>
```

```javascript
app.controller('myController', function ($scope) {
  $scope.spinnerLoaded = function (mySpinner) {
    // Now you can do:
    //   mySpinner.show();
    //   mySpinner.hide();
  };
});
```

> Note: The expression passed to `onRegister` will still be invoked even if `register` is set to `false`.

Notice that we pass in `spinnerApi` to our custom `spinnerLoaded` function. This `spinnerApi` variable is made available by the directive similar to the way `$event` is available within an expression supplied to `ng-click`. The directive also makes `spinnerService` available to the expression if needed, allowing you to avoid cluttering your controller with yet another dependency.

---

#### Transclusion

Sometimes you need more control over the kind of "spinner" you want to display, beyond just a simple animated image. You are able to supply any custom markup that you need by simply nesting it within the spinner directive. Any content will be transcluded below the loading graphic.

```html
<spinner name="mySpinner">
  <h3>Loading...</h3>
</spinner>
```

---

### Spinner Service

The most common way of interacting with your spinners is via the `spinnerService`. This service can be injected just like any other Angular service. Once you have reference to the service you can take advantage of several methods.

```javascript
app.controller('myController', function ($scope, $http, spinnerService) {
  $scope.loadData = function () {
    spinnerService.show('mySpinner');
    $http.get('/api/data')
      .success(function (data) {
        // do stuff with data
        $scope.data = data;
      })
      .catch(function (err) {
        // handle err
        console.error(err);
      })
      .finally(function () {
        // no matter what happens, hide the spinner when done
        spinnerService.hide('mySpinner');
      });
  };
});
```

#### show(spinnerName)

The `show` method allows you to display a specific spinner by name.

```html
<spinner name="mySpinner" img-src="/path/to/loader.gif"></spinner>
```

```javascript
spinnerService.show('mySpinner');
```

#### hide(spinnerName)

Works exactly like `show` but hides the spinner element.

#### showGroup(groupName)

The `showGroup` method allows you to display all spinners with the same group name.

```html
<spinner name="spinner1" group="foo"></spinner>
<spinner name="spinner2" group="foo"></spinner>
<spinner name="spinner3" group="bar"></spinner>
```

```javascript
spinnerService.showGroup('foo');
```

Spinners 1 and 2 would show but spinner 3 would not since it is not part of group "foo".

#### hideGroup(groupName)

Works exactly the same as `showGroup` except it hides the spinners instead.

#### showAll

Hopefully it's obvious that this method will show every single spinner registered with the service. This method is rarely used but is there for parity just in case.

#### hideAll

The `hideAll` method is identical to `showAll` except it hides every spinner that is registered. This method also isn't used very often but is extremely useful in global error handlers. For example, you could override the [default Angular exception handler](https://github.com/angular/angular.js/blob/720012eab6fef5e075a1d6876dd2e508c8e95b73/src/ng/exceptionHandler.js#L43-L49) like so:

```javascript
// Override Angular $exceptionHandler service.
app.factory('$exceptionHandler', function($log, spinnerService) {
  return function(err, cause) {
    spinnerService.hideAll();
    $log.error.apply($log, arguments);
  };
});
```

Now whenever an unhandled error in your Angular app is caught by the Angular exception handler it will hide all of your registered spinners in addition to its usual default behavior. We all know how much users ***HATE*** frozen spinners, right?
