angular.module("bootstrap-switch-angular", [])
    .directive("bootstrapSwitchAngular", [function () {
        var switchDirective = function () {
            

            this.restrict = "A";
            this.require = ['?ngModel'];
            this.link = function (scope, element, attributes, controller) {

                if (controller) {
                    var isValueBeingSet = false;
                    var currentController = controller[0];
                    element.bootstrapSwitch();

                    element.on("switchChange", function (e, data) {
                        if (!isValueBeingSet) {
                            currentController.$setViewValue(data.value);
                            if (!scope.$$phase) {
                                scope.$apply();
                            }
                        }
                    });

                    var validator = function (value) {
                        isValueBeingSet = true;
                        element.bootstrapSwitch("state", value);
                        isValueBeingSet = false;
                        return value;
                    };

                    currentController.$formatters.push(validator);
                }
            };

        };


        return new switchDirective();
    }
    ]);
