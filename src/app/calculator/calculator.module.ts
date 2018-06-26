import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator.component';
import { ButtonComponent } from './button/button.component';
import { DisplayComponent } from './display/display.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalculatorRoutingModule
  ],
  declarations: [
    ButtonComponent,
    CalculatorComponent,
    DisplayComponent,
    HistoryComponent
  ]
})
export class CalculatorModule { }
