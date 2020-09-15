import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
  <p>input-button-unit works!
      the title is {{ title }}
  </p>
  `,
  styleUrls: ['./input-button-unit.component.css']
})
export class InputButtonUnitComponent implements OnInit {
  title = 'nOta Button';
  constructor() {
    this.changeTitle('constructor-title');
  }

  ngOnInit(): void {
    // this.title = 'init-title';
    this.changeTitle('init-title');
  }

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }
}
