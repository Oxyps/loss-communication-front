import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.scss'],
})
export class DefaultTableComponent {
  @Input() title!: string;
  @Input() tableTemplate!: TemplateRef<any>;
  @Input() loading!: boolean;

  // @Output() handleSubmit: EventEmitter<any> = new EventEmitter();
}
