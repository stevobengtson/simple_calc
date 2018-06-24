import { inject, TestBed } from '@angular/core/testing';

import { OperationManagerService } from './operation-manager.service';

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
    service.value$
      .subscribe((result: number) => {
        expect(result)
        .toBe(0);
      });
  }));

  it('should add a value', inject([OperationManagerService], (service: OperationManagerService) => {
    service.add(5);
    service.value$
      .subscribe((result: number) => {
        expect(result)
        .toBe(5);
      });
  }));

  it('should subtract a value', inject([OperationManagerService], (service: OperationManagerService) => {
    service.subtract(5);
    service.value$
      .subscribe((result: number) => {
        expect(result)
        .toBe(-5);
      });
  }));

  it('should multiply a value', inject([OperationManagerService], (service: OperationManagerService) => {
    service.add(5);
    service.multiply(5);
    service.value$
      .subscribe((result: number) => {
        expect(result)
        .toBe(25);
      });
  }));

  it('should divide a value', inject([OperationManagerService], (service: OperationManagerService) => {
    service.add(100);
    service.divide(5);
    service.value$
      .subscribe((result: number) => {
        expect(result)
        .toBe(20);
      });
  }));
});
