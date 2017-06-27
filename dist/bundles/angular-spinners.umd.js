(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.spinners = global.ng.spinners || {}),global.ng.core,global.ng.common));
}(this, (function (exports,_angular_core,_angular_common) { 'use strict';

var SpinnerService = (function () {
    function SpinnerService() {
        this.spinnerCache = new Set();
    }
    SpinnerService.prototype._register = function (spinner) {
        this.spinnerCache.add(spinner);
    };
    SpinnerService.prototype._unregister = function (spinnerToRemove) {
        var _this = this;
        this.spinnerCache.forEach(function (spinner) {
            if (spinner === spinnerToRemove) {
                _this.spinnerCache.delete(spinner);
            }
        });
    };
    SpinnerService.prototype._unregisterGroup = function (spinnerGroup) {
        var _this = this;
        this.spinnerCache.forEach(function (spinner) {
            if (spinner.group === spinnerGroup) {
                _this.spinnerCache.delete(spinner);
            }
        });
    };
    SpinnerService.prototype._unregisterAll = function () {
        this.spinnerCache.clear();
    };
    SpinnerService.prototype.show = function (spinnerName) {
        this.spinnerCache.forEach(function (spinner) {
            if (spinner.name === spinnerName) {
                spinner.show = true;
            }
        });
    };
    SpinnerService.prototype.hide = function (spinnerName) {
        this.spinnerCache.forEach(function (spinner) {
            if (spinner.name === spinnerName) {
                spinner.show = false;
            }
        });
    };
    SpinnerService.prototype.showGroup = function (spinnerGroup) {
        this.spinnerCache.forEach(function (spinner) {
            if (spinner.group === spinnerGroup) {
                spinner.show = true;
            }
        });
    };
    SpinnerService.prototype.hideGroup = function (spinnerGroup) {
        this.spinnerCache.forEach(function (spinner) {
            if (spinner.group === spinnerGroup) {
                spinner.show = false;
            }
        });
    };
    SpinnerService.prototype.showAll = function () {
        this.spinnerCache.forEach(function (spinner) { return spinner.show = true; });
    };
    SpinnerService.prototype.hideAll = function () {
        this.spinnerCache.forEach(function (spinner) { return spinner.show = false; });
    };
    SpinnerService.prototype.isShowing = function (spinnerName) {
        var showing = undefined;
        this.spinnerCache.forEach(function (spinner) {
            if (spinner.name === spinnerName) {
                showing = spinner.show;
            }
        });
        return showing;
    };
    return SpinnerService;
}());
SpinnerService.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
SpinnerService.ctorParameters = function () { return []; };

var SpinnerComponent = (function () {
    function SpinnerComponent(spinnerService) {
        this.spinnerService = spinnerService;
        this.isShowing = false;
        this.showChange = new _angular_core.EventEmitter();
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
SpinnerComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'spinner',
                template: "\n    <div *ngIf=\"show\">\n      <img *ngIf=\"loadingImage\" [src]=\"loadingImage\" />\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
/** @nocollapse */
SpinnerComponent.ctorParameters = function () { return [
    { type: SpinnerService, },
]; };
SpinnerComponent.propDecorators = {
    'name': [{ type: _angular_core.Input },],
    'group': [{ type: _angular_core.Input },],
    'loadingImage': [{ type: _angular_core.Input },],
    'show': [{ type: _angular_core.Input },],
    'showChange': [{ type: _angular_core.Output },],
};

var SpinnerModule = (function () {
    function SpinnerModule() {
    }
    return SpinnerModule;
}());
SpinnerModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                declarations: [SpinnerComponent],
                imports: [_angular_common.CommonModule],
                exports: [SpinnerComponent],
                providers: [SpinnerService]
            },] },
];
/** @nocollapse */
SpinnerModule.ctorParameters = function () { return []; };

/**
 * @module
 * @description
 * Entry point for all public APIs of the angular-spinners package.
 */

exports.SpinnerComponent = SpinnerComponent;
exports.SpinnerService = SpinnerService;
exports.SpinnerModule = SpinnerModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
