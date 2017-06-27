import { SpinnerComponent } from './spinner.component';
export declare class SpinnerService {
    private spinnerCache;
    _register(spinner: SpinnerComponent): void;
    _unregister(spinnerToRemove: SpinnerComponent): void;
    _unregisterGroup(spinnerGroup: string): void;
    _unregisterAll(): void;
    show(spinnerName: string): void;
    hide(spinnerName: string): void;
    showGroup(spinnerGroup: string): void;
    hideGroup(spinnerGroup: string): void;
    showAll(): void;
    hideAll(): void;
    isShowing(spinnerName: string): boolean | undefined;
}
