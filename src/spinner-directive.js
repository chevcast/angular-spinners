angular.module('angularSpinners')
  .directive('spinner', function () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        name: '@?',
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
      controller: function ($scope, spinnerService) {
        if (!$scope.hasOwnProperty('register')) {
          $scope.register = true;
        }
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
        if ($scope.register) {
          spinnerService._register(api);
        }
        $scope.onRegister({ spinnerService: spinnerService, spinnerApi: api });
      }
    };
  });
