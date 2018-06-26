import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { OperationTypes } from '../structures/operation-types';
import { NumberBuilder } from '../number/number-builder';
import { ExpressionBuilder } from '../expression/expression-builder';
import { ExpressionEvaluator } from '../expression/expression-evaluator';
import { Action } from '../structures/action';

@Injectable({
  providedIn: 'root'
})
export class OperationManagerService {
  readonly value$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly action$: Subject<Action> = new Subject<Action>();
  private _expressionBuilder: ExpressionBuilder = new ExpressionBuilder();
  private _currentNumberBuilder: NumberBuilder = new NumberBuilder();

  get currentValue(): number {
    return this.value$.getValue();
  }

  runOperation(operator: OperationTypes, operationValue?: number): void {
    switch (operator) {
      case OperationTypes.ADD: {
        this.addOperator('+');
        break;
      }
      case OperationTypes.SUBTRACT: {
        this.addOperator('-');
        break;
      }
      case OperationTypes.DIVIDE: {
        this.addOperator('/');
        break;
      }
      case OperationTypes.MULTIPLY: {
        this.addOperator('*');
        break;
      }

      case OperationTypes.EXECUTE: {
        this.execute();
        break;
      }

      case OperationTypes.DECIMAL: {
        this._currentNumberBuilder.pushDecimal();
        this.value$.next(this._currentNumberBuilder.value);
        break;
      }

      case OperationTypes.CLEAR: {
        this._expressionBuilder.clear();
        this._currentNumberBuilder.clear();
        this.value$.next(0);
        break;
      }

      case OperationTypes.DELETE: {
        this._currentNumberBuilder.pop();
        this.value$.next(this._currentNumberBuilder.value);
        break;
      }

      default: {
        this._currentNumberBuilder.pushNumber(operationValue);
        this.value$.next(this._currentNumberBuilder.value);
        break;
      }
    }
  }

  private execute(): void {
    this.addCurrentNumber();
    this.operate();
    const action = new Action(this._expressionBuilder.toString(), this.currentValue);
    this.action$.next(action);
    this._expressionBuilder.clear();
  }

  private addOperator(operator: string): void {
    this.addCurrentNumber();
    if (this._expressionBuilder.hasOperator())
      this.operate();
    this._expressionBuilder.addExpression(operator);
  }

  private addCurrentNumber(): void {
    if (this._expressionBuilder.length === 0 ||
        this._expressionBuilder.hasOperator() ||
        this._currentNumberBuilder.value !== 0)
      this._expressionBuilder.addExpression(`${this._currentNumberBuilder.value}`);

    this._currentNumberBuilder.clear();
  }

  private operate(): void {
    const evaluator = new ExpressionEvaluator();
    const expression = this._expressionBuilder.toString();
    const result = evaluator.evaluate(this._expressionBuilder);
    this.value$.next(result);
  }
}
