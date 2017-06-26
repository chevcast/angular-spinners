import { OnInit, EventEmitter } from '@angular/core';
import { SpinnerService } from './spinner.service';
export declare class SpinnerComponent implements OnInit {
    private spinnerService;
    constructor(spinnerService: SpinnerService);
    name: string;
    group: string;
    loadingImage: string;
    private isShowing;
    show: boolean;
    showChange: EventEmitter<{}>;
    ngOnInit(): void;
}
