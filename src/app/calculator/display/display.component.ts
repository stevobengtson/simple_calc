import { Component, OnInit } from '@angular/core';
import { OperationManagerService } from '../operation/operation-manager.service';

@Component({
  selector: 'app-calculator-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  displayValue: number;

  constructor(private _operationManagerService: OperationManagerService) {
    this.displayValue = 0;
  }

  ngOnInit(): void {
    this._operationManagerService.value$.subscribe((value: number) => this.displayValue = value);
  }
}
