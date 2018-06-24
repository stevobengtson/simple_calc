export enum Operations {
  ADD = 0,
  SUBTRACT = 1,
  MULTIPLY = 2,
  DIVIDE = 3,
  CLEAR = 4,
  EXECUTE = 5
}

export class Operation {
  private _result: number;
  private operationString = [
    'Add', 'Subtract', 'Multiply', 'Divide', 'Clear', 'Execute'
  ];

  constructor(
    private _originalValue: number,
    private _operation: Operations,
    private _operationValue?: number
  ) {
    this.performOperation();
  }

  get result(): number {
    return this._result;
  }

  get operation(): Operations {
    return this._operation;
  }

  get operationValue(): number {
    return this._operationValue;
  }

  private performOperation(): void {
    let currentValue = this._originalValue;
    switch (this._operation) {
      case Operations.ADD: {
        currentValue += this._operationValue;
        break;
      }

      case Operations.SUBTRACT: {
        currentValue -= this._operationValue;
        break;
      }

      case Operations.MULTIPLY: {
        currentValue *= this._operationValue;
        break;
      }

      case Operations.DIVIDE: {
        currentValue /= this._operationValue;
        break;
      }

      case Operations.CLEAR: {
        currentValue = 0;
        break;
      }

      default: {
        throw ReferenceError('Invalid operation requested');
      }
    }
    this._result = currentValue;
  }
}
