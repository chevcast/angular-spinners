import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { SpinnerService } from './spinner.service';
export declare class SpinnerComponent implements OnInit, OnDestroy {
    private spinnerService;
    constructor(spinnerService: SpinnerService);
    name: string;
    group: string;
    loadingImage: string;
    private isShowing;
    show: boolean;
    showChange: EventEmitter<{}>;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
