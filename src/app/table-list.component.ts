import { Component, OnInit, Input } from '@angular/core';

declare const Liferay: any;

@Component({
  selector: 'table-list',
  templateUrl:
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-detail/app/table-list.component.html'
})
export class TableListComponent implements OnInit {
  headers: any;
  keys: any;
  $data: any;
  @Input() set data(data: any) {
    this.$data = data;
  }
  @Input() configTable: any;
  @Input() modifiers = {};
  @Input() contentClass: string;

  ngOnInit() {
    if (this.configTable) {
      this.headers = Object.values(this.configTable);
      this.keys = Object.keys(this.configTable);
    }
  }
}
