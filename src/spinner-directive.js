angular.module('angularSpinners')
  .directive('spinner', function () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        name: '@?',
        group: '@?',
        show: '=?',
        imgSrc: '@?',
        register: '@?',
        onLoaded: '&?',
        onShow: '&?',
        onHide: '&?'
      },
      template: [
        '<div ng-show="show">',
        '  <img ng-show="imgSrc" ng-src="{{imgSrc}}" />',
        '  <div ng-transclude></div>',
        '</div>'
      ].join(''),
      controller: function ($scope, spinnerService) {

        // register should be true by default if not specified.
        if (!$scope.hasOwnProperty('register')) {
          $scope.register = true;
        } else {
          $scope.register = $scope.register.toLowerCase() === 'false' ? false : true;
        }

        // Declare a mini-API to hand off to our service so the service
        // doesn't have a direct reference to this directive's scope.
        var api = {
          name: $scope.name,
          group: $scope.group,
          show: function () {
            $scope.show = true;
          },
          hide: function () {
            $scope.show = false;
          },
          toggle: function () {
            $scope.show = !$scope.show;
          }
        };

        // Register this spinner with the spinner service.
        if ($scope.register === true) {
          spinnerService._register(api);
        }

        // If an onShow or onHide expression was provided, register a watcher
        // that will fire the relevant expression when show's value changes.
        if ($scope.onShow || $scope.onHide) {
          $scope.$watch('show', function (show) {
            if (show && $scope.onShow) {
              $scope.onShow({ spinnerService: spinnerService, spinnerApi: api });
            } else if (!show && $scope.onHide) {
              $scope.onHide({ spinnerService: spinnerService, spinnerApi: api });
            }
          });
        }

        // This spinner is good to go. Fire the onLoaded expression.
        if ($scope.onLoaded) {
          $scope.onLoaded({ spinnerService: spinnerService, spinnerApi: api });
        }

        // Unregister this spinner if the $destroy event is emitted on scope.
        $scope.$on('$destroy', function () {
          spinnerService._unregister($scope.name);
        });
      }
    };
  });
