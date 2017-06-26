import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
var SpinnerModule = (function () {
    function SpinnerModule() {
    }
    return SpinnerModule;
}());
export { SpinnerModule };
SpinnerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SpinnerComponent],
                imports: [CommonModule],
                exports: [SpinnerComponent],
                providers: [SpinnerService]
            },] },
];
/** @nocollapse */
SpinnerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=spinner.module.js.map