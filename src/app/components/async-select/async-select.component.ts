import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';

import { BaseModel } from 'src/app/models/base.model';
import { BaseService } from 'src/app/services/base.service';
import { RequestQueryType } from 'src/app/services/interfaces/resquest-query-type';

export interface DefaultOptionType {
  key: string;
  value: any;
}

@Component({
  selector: 'app-async-select',
  templateUrl: './async-select.component.html',
  styleUrls: ['./async-select.component.scss'],
})
export class AsyncSelectComponent<T extends BaseModel> implements OnInit {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() options?: any[];
  @Input() service?: BaseService<T>;

  @Input() displayFunction!: (option: any) => string;

  @Input() appearance: MatFormFieldAppearance = 'outline';

  @Output() customFieldFocus: EventEmitter<any> = new EventEmitter();
  @Output() customFieldBlur: EventEmitter<any> = new EventEmitter();

  filteredOptions?: Observable<any>;
  optionsLoading = false;

  ngOnInit(): void {
    if (this.service !== undefined) {
      this.loadOptionsFromService();
    } else {
      this.filteredOptions = this.form.get(this.controlName)!.valueChanges
        .pipe(
          startWith(''),
          map(inputValue => this._filter(inputValue))
        )
      ;
    }
  }

  _filter(inputValue: string | DefaultOptionType): string[] {
    let value = '';

    if (typeof inputValue === 'string') {
      value = inputValue.toLowerCase();
    } else {
      value = inputValue.value.toLowerCase();
    }

    return this.options!.filter(
      (option: DefaultOptionType) => {
        return option.value.toLowerCase().includes(value);
      }
    );
  }

  loadOptionsFromService(): void {
    this.filteredOptions = this.form.get(this.controlName)!.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.optionsLoading = true),
        switchMap(inputValue => {
          const query: RequestQueryType<T> = {
            search: inputValue,
          };

          this.optionsLoading = true;

          return this.service!.findAll(query)
            .pipe(
              map(response => response.data),
              catchError(() => of([])),
              finalize(() => this.optionsLoading = false)
            )
          ;
        })
      )
    ;
  }

  fieldFocus() {
    const field = this.form.get(this.controlName)!;

    if (!field.value) {
      field.setValue('');
    }
  }

  fieldBlur() {
    const field = this.form.get(this.controlName)!;

    if (typeof field.value !== 'object') {
      field.setValue('');
    }
  }
}
