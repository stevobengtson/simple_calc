import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { HistoryService } from './history.service';
import { Action } from '../structures/action';
import { of } from 'rxjs';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let historyService: HistoryService;
  const ACTION_OBJECT: Action = new Action('1+1', 2);
  const OPERATOR_ACTION_OBJECT: Action = new Action('1+2+', 3);
  const ZERO_ACTION_OBJECT: Action = new Action('0', 0);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      providers: [ HistoryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    historyService = TestBed.get(HistoryService);
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should add an entry to the log', () => {
    historyService.addEntry(ACTION_OBJECT);
    expect(component.logs.length)
      .toBe(1);
  });

  it('should not add an entry that has an operator at the end', () => {
    historyService.addEntry(OPERATOR_ACTION_OBJECT);
    expect(component.logs.length)
      .toBe(0);
  });

  it('should not add an entry that is only 0', () => {
    historyService.addEntry(ZERO_ACTION_OBJECT);
    expect(component.logs.length)
      .toBe(0);
  });

  it('should clear all entries in the log', () => {
    historyService.addEntry(ACTION_OBJECT);
    component.clearHistory();
    expect(component.logs.length)
      .toBe(0);
  });
});
