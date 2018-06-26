import { inject, TestBed } from '@angular/core/testing';

import { OperationManagerService } from './operation-manager.service';
import { OperationTypes } from '../structures/operation-types';

describe('OperationManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperationManagerService]
    });
  });

  it('should be created', inject([OperationManagerService], (service: OperationManagerService) => {
    expect(service)
      .toBeTruthy();
  }));

  it('should start with a zero value', inject([OperationManagerService], (service: OperationManagerService) => {
    expect(service.currentValue)
      .toBe(0);
  }));

  it('should execute an action when operator used', inject([OperationManagerService], (service: OperationManagerService) => {
    service.runOperation(OperationTypes.NUMBER, 5);
    service.runOperation(OperationTypes.ADD);
    service.runOperation(OperationTypes.NUMBER, 6);
    service.runOperation(OperationTypes.SUBTRACT);
    expect(service.currentValue)
      .toBe(11);
  }));

  it('should execute an action', inject([OperationManagerService], (service: OperationManagerService) => {
    service.runOperation(OperationTypes.NUMBER, 5);
    service.runOperation(OperationTypes.ADD);
    service.runOperation(OperationTypes.NUMBER, 5);
    service.runOperation(OperationTypes.MULTIPLY);
    service.runOperation(OperationTypes.NUMBER, 5);
    service.runOperation(OperationTypes.DIVIDE);
    service.runOperation(OperationTypes.NUMBER, 5);
    service.runOperation(OperationTypes.SUBTRACT);
    service.runOperation(OperationTypes.NUMBER, 5);
    service.runOperation(OperationTypes.EXECUTE);
    expect(service.currentValue)
      .toBe(5);
  }));

  it('should add a decimal value', inject([OperationManagerService], (service: OperationManagerService) => {
    service.runOperation(OperationTypes.NUMBER, 5);
    service.runOperation(OperationTypes.DECIMAL);
    service.runOperation(OperationTypes.NUMBER, 6);
    expect(service.currentValue)
      .toBe(5.6);
  }));

  it('should clear the current number entered', inject([OperationManagerService], (service: OperationManagerService) => {
    service.runOperation(OperationTypes.NUMBER, 5);
    expect(service.currentValue)
      .toBe(5);
    service.runOperation(OperationTypes.CLEAR);
    expect(service.currentValue)
      .toBe(0);
  }));

  it('should remove the last number', inject([OperationManagerService], (service: OperationManagerService) => {
    service.runOperation(OperationTypes.NUMBER, 1);
    service.runOperation(OperationTypes.NUMBER, 2);
    service.runOperation(OperationTypes.NUMBER, 3);
    expect(service.currentValue)
      .toBe(123);
    service.runOperation(OperationTypes.DELETE);
    expect(service.currentValue)
      .toBe(12);
  }));
});
