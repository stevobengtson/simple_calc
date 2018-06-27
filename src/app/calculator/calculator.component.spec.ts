import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CalculatorComponent } from './calculator.component';
import { ButtonComponent } from './button/button.component';
import { DisplayComponent } from './display/display.component';
import { HistoryComponent } from './history/history.component';
import { OperationManagerService } from './operation/operation-manager.service';
import { OperationTypes } from './structures/operation-types';
import { HistoryService } from './history/history.service';
import { Action } from './structures/action';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let operationManagerService: OperationManagerService;
  let historyService: HistoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        CalculatorComponent,
        ButtonComponent,
        DisplayComponent,
        HistoryComponent
      ],
      providers: [ OperationManagerService, HistoryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    operationManagerService = TestBed.get(OperationManagerService);
    historyService = TestBed.get(HistoryService);
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should run operation when button clicked', () => {
    spyOn(operationManagerService, 'runOperation');
    component.doOperation(OperationTypes.NUMBER, '1');
    expect(operationManagerService.runOperation)
      .toHaveBeenCalledWith(OperationTypes.NUMBER, 1);
  });

  it('should receive and action', () => {
    const action = new Action('1+1', 2);
    spyOn(historyService, 'addEntry');
    operationManagerService.action$.next(action);
    expect(historyService.addEntry)
      .toHaveBeenCalledWith(action);
  });

  describe('Keyboard Events', () => {
    const testKeys = [
      { key: '0', code: '0', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '1', code: '1', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '2', code: '2', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '3', code: '3', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '4', code: '4', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '5', code: '5', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '6', code: '6', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '7', code: '7', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '8', code: '8', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: '9', code: '9', operation: OperationTypes.NUMBER, operationValue: 0 },
      { key: 'Enter', code: 'Enter', operation: OperationTypes.EXECUTE, operationValue: undefined },
      { key: 'c', code: 'KeyC', operation: OperationTypes.CLEAR, operationValue: undefined },
      { key: '/', code: '/', operation: OperationTypes.DIVIDE, operationValue: undefined },
      { key: '\\', code: '\\', operation: OperationTypes.DIVIDE, operationValue: undefined },
      { key: '*', code: '*', operation: OperationTypes.MULTIPLY, operationValue: undefined },
      { key: '-', code: '-', operation: OperationTypes.SUBTRACT, operationValue: undefined },
      { key: '+', code: '+', operation: OperationTypes.ADD, operationValue: undefined },
      { key: '.', code: '.', operation: OperationTypes.EXECUTE, operationValue: undefined },
      { key: 'Delete', code: 'Delete', operation: OperationTypes.DELETE, operationValue: undefined },
      { key: 'Backspace', code: 'Backspace', operation: OperationTypes.DELETE, operationValue: undefined }
    ];

    it('should respond to keys', () => {
      spyOn(operationManagerService, 'runOperation');

      testKeys.forEach((testKey: any) => {
        const event = new KeyboardEvent('keydown', { key: testKey.key, code: testKey.code });
        fixture.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        component.handleKeyboardEvent(event);
        if (testKey.operationValue !== undefined)
          expect(operationManagerService.runOperation)
            .toHaveBeenCalledWith(testKey.operation, testKey.operationValue);
        else
          expect(operationManagerService.runOperation)
            .toHaveBeenCalledWith(testKey.operation);
      });
    });
  });
});
