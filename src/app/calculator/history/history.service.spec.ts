import { inject, TestBed } from '@angular/core/testing';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryService]
    });
  });

  it('should be created', inject([HistoryService], (service: HistoryService) => {
    expect(service)
      .toBeTruthy();
  }));

  it('should add an entry', inject([HistoryService], (service: HistoryService) => {
    service.addEntry({ expression: '1+2', result: 3 });
    expect(service)
      .toBeTruthy();
  }));
});
