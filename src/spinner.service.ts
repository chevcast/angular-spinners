import { Injectable } from '@angular/core';
import { SpinnerComponent } from './spinner.component';


@Injectable()
export class SpinnerService {
  private spinnerCache = new Set<SpinnerComponent>();

  _register(spinner: SpinnerComponent): void {
    this.spinnerCache.add(spinner);
  }

  _unregister(spinnerName: string): void {
    for (let spinner of this.spinnerCache) {
      if (spinner.name === spinnerName) {
        return this.spinnerCache.delete(spinner);
      }
    });
  }

  _unregisterGroup(spinnerGroup: string): void {
    for (let spinner of this.spinnerCache) {
      if (spinner.group === spinnerGroup) {
        this.spinnerCache.delete(spinner);
      }
    };
  }

  _unregisterAll(): void {
    this.spinnerCache.clear();
  }

  show(spinnerName: string): void {
    for (let spinner of this.spinnerCache) {
      if (spinner.name === spinnerName) {
        return spinner.show = true;
      }
    };
  }

  hide(spinnerName: string): void {
    for (let spinner in this.spinnerCache) {
      if (spinner.name === spinnerName) {
        return spinner.show = false;
      }
    };
  }

  showGroup(spinnerGroup: string): void {
    for (let spinner of this.spinnerCache) {
      if (spinner.group === spinnerGroup) {
        spinner.show = true;
      }
    };
  }

  hideGroup(spinnerGroup: string): void {
    for (let spinner of this.spinnerCache) {
      if (spinner.group === spinnerGroup) {
        spinner.show = false;
      }
    };
  }

  showAll(): void {
    for (let spinner of this.spinnerCache) {
      spinner.show = true;
    }
  }

  hideAll(): void {
    for (let spinner of this.spinnerCache) {
      spinner.show = true;
    }
  }

  isShowing(spinnerName: string): boolean {
    for (let spinner of this.spinnerCache) {
      if (spinner.name === spinnerName) {
        return spinner;
      }
    };
  }
}