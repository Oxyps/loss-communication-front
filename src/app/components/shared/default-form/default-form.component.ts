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

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  pushSnackBar(success: boolean, message: string): void {
    this._snackBar.open(
      message,
      'x', {
        duration: 5000,
        panelClass: [
          success ? 'success-snackbar' : 'error-snackbar'
        ],
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
    );
  }
}
