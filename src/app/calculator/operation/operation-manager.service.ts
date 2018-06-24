import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Operation, Operations } from './operation';

@Injectable({
  providedIn: 'root'
})
export class OperationManagerService {
  readonly value$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly operations$: Subject<Operation> = new Subject<Operation>();

  get currentValue(): number {
    return this.value$.getValue();
  }

  add(addValue: number): void {
    this.runOperation(Operations.ADD, addValue);
  }

  subtract(subtractValue: number): void {
    this.runOperation(Operations.SUBTRACT, subtractValue);
  }

  multiply(multiplyValue: number): void {
    this.runOperation(Operations.MULTIPLY, multiplyValue);
  }

  divide(divideValue: number): void {
    this.runOperation(Operations.DIVIDE, divideValue);
  }

  runOperation(operation: Operations, operationValue: number): void {
    const newOperation = new Operation(this.currentValue, operation, operationValue);
    // console.log(newOperation.toString());
    this.value$.next(newOperation.result);
    this.operations$.next(newOperation);
  }
}
