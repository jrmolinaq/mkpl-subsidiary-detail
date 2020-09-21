import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

declare const Liferay: any;

@Component({
  selector: 'search',
  templateUrl: 
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-detail/app/search.component.html'
})
export class SearchComponent {
  @ViewChild('inputText', { static: false }) el: ElementRef;
  @Output() item: EventEmitter<string> = new EventEmitter();

  searchItem(item: string) {
    this.el.nativeElement.value = '';
    this.item.emit(item);
  }
}
