# angular-spinners
A library for easily adding spinners and a spinner hide/show API to your Angular application.

### Install

You can either download the library manually [here](https://raw.githubusercontent.com/codetunnel/angular-spinners/master/dist/angular-spinners.min.js), install with Bower, or with npm.

#### Bower:

> $ bower install angular-spinners

#### npm:

> $ npm install angular-spinners

### Quick Start


#### Browser:

```html
<script src="/bower_components/angular-spinners/dist/angular-spinners.min.js"></script>
```

#### Node.js

```javascript
require('angular-spinners');
```

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

Here is a [working demo](http://codepen.io/Chevex/pen/pvoLgB/).

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

By default all spinners are hidden when first registered. You can set a spinner to be visible by default by setting the `show` option. Unlike other options, this one is two-way bound and allows you to pass in a variable from the parent scope of the directive. This allows you to automatically hide/show the spinner based on some boolean from your application. This is likely similar to the way you've done spinners in the past and is included here for convenience. I want to ensure you have multiple intuitive ways to control your spinner(s) how you see fit.

```javascript
app.controller('myController', function ($scope, $http) {
  $scope.loading = true;
  $http.get('/path/to/data')
    .success(function (data) {
      // do stuff with data
    }) 
    .catch(function (err) {
      // handle error
    })
    .finally(function () {
      $scope.loading = false;
    });
});
```

```html
<div ng-controller="myController">
  <spinner name="mySpinner" show="loading"></spinner>
</div>
```

You can also just pass a simple boolean value to the option. For example, you could show the spinner by default and ignore the effects of two-way binding by simply passing `true` to the `show` option.

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
<spinner img-src="/path/to/loader.gif" register="false"></spinner>
```

> NOTE: Keep in mind that if you disable spinner registration then this spinner will not be tracked by the spinner service at all. It won't even hide if you call `spinnerService.hideAll()`.

If you do this then you'll want to manually get reference to that spinner's API so you can talk to it directly in order to hide/show it. You can do that with the `onLoaded` option below.

#### onLoaded

Sometimes you need to know when a spinner is loaded and registered with the spinner service. To be notified of this simpy supply an an Angular expression to the `onLoaded` option.

```html
<spinner name="mySpinner" on-loaded="spinnerLoaded(spinnerApi);"></spinner>
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

#### onShow

In some cases you may need to fire some custom logic when the spinner is shown. Rather than worry about tracking when the spinner is hidden or shown on your own just so you can fire off some custom logic, you can call into that custom logic from the `onShow` expression. A good example would be an animated `<canvas>` loading spinner; you may want to fire off some custom javascript to draw the canvas and start the animation as soon as the spinner is shown.

```html
<spinner name="mySpinner" on-show="startAnimation()"></spinner>
```

```javascript
app.controller('myCtrl', function ($scope) {
  $scope.startAnimation = function () {
    // canvas drawing/animation logic here.
  };
});
```

Here is a demo of using `onShow` to start a canvas animation: [http://codepen.io/Chevex/pen/XbzgEL](https://www.npmjs.com/package/angular-spinners)

#### onHide

The `onHide` option is exactly the same as `onShow` except the expression is evaluated when the spinner is hidden rather than shown.

> NOTE: It might be tempting to use `onShow` or `onHide` to fire off some kind of render or data loading logic. My recommendation would be that you don't allow your spinners to be a critical part of your application. Your spinners should show/hide as a side-effect of logic happening in your app. Critical logic in your application should not be dependent upon the spinner's hide/show expressions. In other words, don't do this:

> ```html
> <spinner name="mySpinner" on-show="loadData()" on-hide="renderData()">
> </spinner>
> ```

---

#### Transclusion

Sometimes you need more control over the kind of "spinner" you want to display, beyond just a simple animated image. You are able to supply any custom markup that you need by simply nesting it within the spinner directive. Any content will be transcluded below the loading graphic. If you don't want a loading graphic and prefer to only use your own custom markup, simply don't supply the `imgSrc` option and a graphic won't be used.

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

---

# Frequently Asked Questions

> #### Q) Why do I get "No spinner named 'xyz' is registered." when I try to show my spinner?
> 
> **A)** You are trying to show your spinner element before the directive has registered itself with the spinner service. See [this issue](https://github.com/codetunnel/angular-spinners/issues/4) for a full explanation.

---

# License

The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
