import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() buttonClass: string;
  @Output() buttonPressed: EventEmitter<null> = new EventEmitter();

  buttonClick(): void {
    this.buttonPressed.emit();
  }
}
