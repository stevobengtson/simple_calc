import { Component, OnInit } from '@angular/core';
import { NumberBuilder } from './number-builder';
import { OperationManagerService } from './operation/operation-manager.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  buttonData = [
    [
      { text: 'CE', class: 'clear' },
      { text: 'C', class: 'clear' },
      { text: '&larr;', class: 'operator' },
      { text: '&divide;', class: 'operator' }
    ],
    [
      { text: '7', class: '' },
      { text: '8', class: '' },
      { text: '9', class: '' },
      { text: '&divide;', class: 'operator' }
    ],
    [
      { text: '4', class: '' },
      { text: '5', class: '' },
      { text: '6', class: '' },
      { text: 'X', class: 'operator' }
    ],
    [
      { text: '1', class: '' },
      { text: '2', class: '' },
      { text: '3', class: '' },
      { text: '+', class: 'operator' }
    ],
    [
      { text: '+/-', class: 'operator' },
      { text: '0', class: '' },
      { text: '.', class: '' },
      { text: '=', class: 'eval' }
    ]
  ];

  private _numberBuilder = new NumberBuilder();

  // TODO: Need service to keep history of operations (to be shown in another component)
  constructor(private _operationManagerService: OperationManagerService) {}

  ngOnInit(): void {
    const getRandomInt = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    setInterval(() => {
      const randValue = getRandomInt(0, 10);
      if (randValue === 10)
        this._numberBuilder.pushDecimal();
      else
        this._numberBuilder.pushNumber(randValue);
    }, 123);

    setInterval(() => {
      const randOperation = getRandomInt(0, 4);
      this._operationManagerService.runOperation(randOperation, this._numberBuilder.value);
      this._numberBuilder.clear();
    }, 1000);
  }
}
