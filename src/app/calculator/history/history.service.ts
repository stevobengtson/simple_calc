import { Injectable } from '@angular/core';
import { Action } from '../structures/action';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  readonly history$: Subject<Action> = new Subject<Action>();
  private _historyLog = [];

  addEntry(action: Action): void {
    this._historyLog.push(action);
    this.history$.next(action);
  }
}
