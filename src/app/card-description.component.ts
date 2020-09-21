import { Component, Input } from '@angular/core';

declare const Liferay: any;

@Component({
  selector: 'card-description',
  templateUrl: 
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-detail/app/card-description.component.html'
})

export class CardDescriptionComponent {
  @Input() cardTitle: string;
  @Input() dataFields: object;
  @Input() data: object;

  objectKeys = Object.keys;

  isLastItem(index: number, object:any) {
    return index === this.objectKeys(object).length - 1;
  } 

}
