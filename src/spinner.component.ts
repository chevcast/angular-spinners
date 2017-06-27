import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'spinner',
  template: `
    <div *ngIf="show">
      <img *ngIf="loadingImage" [src]="loadingImage" />
      <ng-content></ng-content>
    </div>
  `
})
export class SpinnerComponent implements OnInit, OnDestroy {
  constructor(private spinnerService: SpinnerService) {}

  @Input() name: string;
  @Input() group: string;
  @Input() loadingImage: string;

  private isShowing = false;

  @Input()
  get show(): boolean {
    return this.isShowing;
  }

  @Output() showChange = new EventEmitter();

  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);
  }

  ngOnInit(): void {
    if (!this.name) throw new Error("Spinner must have a 'name' attribute.");

    this.spinnerService._register(this);
  }

  ngOnDestroy(): void {
    this.spinnerService._unregister(this);
  }
}
