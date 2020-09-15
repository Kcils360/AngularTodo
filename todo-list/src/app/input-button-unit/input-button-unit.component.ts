import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
  <p>input-button-unit works!
      the title is: {{ title }}
  </p>
  <input [value]="generateTitle()">
  <button>Save</button>
  `,
  styleUrls: ['./input-button-unit.component.css']
})
export class InputButtonUnitComponent implements OnInit {
  title = 'New Button';
  constructor() {  }

  ngOnInit(): void {
    setTimeout(() => {
      this.title = 'Some new cool title';
    }, 3000);
   }

  generateTitle(): string {
    return 'A generated Title';
  }
}
