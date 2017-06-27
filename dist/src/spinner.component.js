import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SpinnerService } from './spinner.service';
var SpinnerComponent = (function () {
    function SpinnerComponent(spinnerService) {
        this.spinnerService = spinnerService;
        this.isShowing = false;
        this.showChange = new EventEmitter();
    }
    Object.defineProperty(SpinnerComponent.prototype, "show", {
        get: function () {
            return this.isShowing;
        },
        set: function (val) {
            this.isShowing = val;
            this.showChange.emit(this.isShowing);
        },
        enumerable: true,
        configurable: true
    });
    SpinnerComponent.prototype.ngOnInit = function () {
        if (!this.name)
            throw new Error("Spinner must have a 'name' attribute.");
        this.spinnerService._register(this);
    };
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.spinnerService._unregister(this);
    };
    return SpinnerComponent;
}());
export { SpinnerComponent };
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'spinner',
                template: "\n    <div *ngIf=\"show\">\n      <img *ngIf=\"loadingImage\" [src]=\"loadingImage\" />\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
/** @nocollapse */
SpinnerComponent.ctorParameters = function () { return [
    { type: SpinnerService, },
]; };
SpinnerComponent.propDecorators = {
    'name': [{ type: Input },],
    'group': [{ type: Input },],
    'loadingImage': [{ type: Input },],
    'show': [{ type: Input },],
    'showChange': [{ type: Output },],
};
//# sourceMappingURL=spinner.component.js.map