import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { OperationTypes } from './structures/operation-types';
import { OperationManagerService } from './operation/operation-manager.service';
import { HistoryService } from './history/history.service';
import { Action } from './structures/action';
import { Subscription } from 'rxjs';

class ButtonData {
  text: string;
  class: string;
  operation: OperationTypes;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  buttonData = [
    [
      { text: '', class: '', operation: OperationTypes.NONE },
      { text: '', class: '', operation: OperationTypes.NONE },
      { text: '&larr;', class: 'clear', operation: OperationTypes.DELETE },
      { text: '&divide;', class: 'operator', operation: OperationTypes.DIVIDE }
    ],
    [
      { text: '7', class: '', operation: OperationTypes.NUMBER },
      { text: '8', class: '', operation: OperationTypes.NUMBER },
      { text: '9', class: '', operation: OperationTypes.NUMBER },
      { text: '&times;', class: 'operator', operation: OperationTypes.MULTIPLY }
    ],
    [
      { text: '4', class: '', operation: OperationTypes.NUMBER },
      { text: '5', class: '', operation: OperationTypes.NUMBER },
      { text: '6', class: '', operation: OperationTypes.NUMBER },
      { text: '-', class: 'operator', operation: OperationTypes.SUBTRACT }
    ],
    [
      { text: '1', class: '', operation: OperationTypes.NUMBER },
      { text: '2', class: '', operation: OperationTypes.NUMBER },
      { text: '3', class: '', operation: OperationTypes.NUMBER },
      { text: '+', class: 'operator', operation: OperationTypes.ADD }
    ],
    [
      { text: 'C', class: 'clear', operation: OperationTypes.CLEAR },
      { text: '0', class: '', operation: OperationTypes.NUMBER },
      { text: '.', class: '', operation: OperationTypes.DECIMAL },
      { text: '=', class: 'eval', operation: OperationTypes.EXECUTE }
    ]
  ];

  private subscription: Subscription;

  constructor(
    private _operateManagerService: OperationManagerService,
    private _historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.subscription = this._operateManagerService.action$.subscribe((action: Action) => {
      this._historyService.addEntry(action);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  canShowButton(button: ButtonData): boolean {
    return (button.operation !== OperationTypes.NONE);
  }

  doOperation(operation: OperationTypes, text: string): void {
    this._operateManagerService.runOperation(operation, parseInt(text, 10));
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key >= '0' && event.key <= '9')
      this._operateManagerService.runOperation(OperationTypes.NUMBER, parseInt(event.key, 10));
    else if (event.key === 'Enter')
      this._operateManagerService.runOperation(OperationTypes.EXECUTE);
    else if (event.code === 'KeyC')
      this._operateManagerService.runOperation(OperationTypes.CLEAR);
    else if (event.key === '/' || event.key === '\\')
      this._operateManagerService.runOperation(OperationTypes.DIVIDE);
    else if (event.key === '*')
      this._operateManagerService.runOperation(OperationTypes.MULTIPLY);
    else if (event.key === '-')
      this._operateManagerService.runOperation(OperationTypes.SUBTRACT);
    else if (event.key === '+')
      this._operateManagerService.runOperation(OperationTypes.ADD);
    else if (event.key === '.')
      this._operateManagerService.runOperation(OperationTypes.DECIMAL);
    else if (event.code === 'Delete' || event.code === 'Backspace')
      this._operateManagerService.runOperation(OperationTypes.DELETE);
  }

  trackerRow(index: number, item: Array<any>): number {
    return index;
  }

  trackerButton(index: number, item: any): number {
    return index;
  }
}
