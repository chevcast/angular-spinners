angular.module('angularSpinners', [])
  .factory('spinnerService', function () {
    var spinners = {};
    return {
      _register: function (data) {
        if (!data.hasOwnProperty('name')) {
          throw new Error("Spinner must specify a name when registering with the spinner service.");
        }
        spinners[data.name] = data;
      },
      _unregister: function (name) {
        if (spinners.hasOwnProperty(name)) {
          delete spinners[name];
        }
      },
      _unregisterGroup: function (group) {
        for (var name in spinners) {
          if (spinners[name].group === group) {
            delete spinners[name];
          }
        }
      },
      _unregisterAll: function () {
        for (var name in spinners) {
          delete spinners[name];
        }
      },
      show: function (name) {
        var spinner = spinners[name];
        if (!spinner) {
          throw new Error("No spinner named '" + name + "' is registered.");
        }
        spinner.show();
      },
      hide: function (name) {
        var spinner = spinners[name];
        if (!spinner) {
          throw new Error("No spinner named '" + name + "' is registered.");
        }
        spinner.hide();
      },
      showGroup: function (group) {
        var groupExists = false;
        for (var name in spinners) {
          var spinner = spinners[name];
          if (spinner.group === group) {
            spinner.show();
            groupExists = true;
          }
        }
        if (!groupExists) {
          throw new Error("No spinners found with group '" + group + "'.")
        }
      },
      hideGroup: function (group) {
        var groupExists = false;
        for (var name in spinners) {
          var spinner = spinners[name];
          if (spinner.group === group) {
            spinner.hide();
            groupExists = true;
          }
        }
        if (!groupExists) {
          throw new Error("No spinners found with group '" + group + "'.")
        }
      },
      showAll: function () {
        for (var name in spinners) {
          spinners[name].show();
        }
      },
      hideAll: function () {
        for (var name in spinners) {
          spinners[name].hide();
        }
      }
    };
  });
