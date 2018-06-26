import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from './history.service';
import { Action } from '../structures/action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calculator-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
  logs: Array<Action> = [];
  private subscription: Subscription;

  constructor(private _historyService: HistoryService) {}

  ngOnInit(): void {
    this.subscription = this._historyService.history$
      .subscribe((action: Action) => this.logAction(action));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearHistory(): void {
    this.logs = [];
  }

  trackLog(index: number, item: Action): number {
    return index;
  }

  private logAction(action: Action): void {
    if (action.expression.match(/[\+\-\*\/]$/) === null &&
        action.expression !== '0')
      this.logs.unshift(action);
  }
}
