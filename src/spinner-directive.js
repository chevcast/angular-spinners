angular.module('spinners')
  .directive('spinner', function () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        name: '@',
        group: '@?',
        show: '@?',
        imgSrc: '@?',
        register: '@?',
        onRegister: '&?'
      },
      template: [
        '<span ng-show="show">',
        '  <img ng-show="imgSrc" src="{{imgSrc}}" />',
        '  <span ng-transclude></span>',
        '</span>'
      ].join(''),
      controller: ["$scope", "spinnerService", function ($scope, spinnerService) {
        if (!$scope.hasOwnProperty('name')) {
          throw new Error("Spinner must specify a name.");
        }
        if (!$scope.hasOwnProperty('register')) {
          $scope.register = true;
        }
        if ($scope.register) {
          spinnerService._register({
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
          });
        }
        $scope.onRegister({ spinnerService: spinnerService });
      }]
    };
  });
