import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-default-form',
  templateUrl: './default-form.component.html',
  styleUrls: ['./default-form.component.scss'],
})
export class DefaultFormComponent {
  @Input() title!: string;
  @Input() formTemplate!: TemplateRef<any>;
  @Input() loading!: boolean;
  @Input() isEditMode!: boolean;

  @Output() handleSubmit: EventEmitter<any> = new EventEmitter();
}
