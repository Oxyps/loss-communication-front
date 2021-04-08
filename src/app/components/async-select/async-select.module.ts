import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';

import { AsyncSelectComponent } from './async-select.component';
import { SharedModules } from '../shared/shared-modules.module';

@NgModule({
  declarations: [
    AsyncSelectComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,

    SharedModules,
  ],
  exports: [
    AsyncSelectComponent,

    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
  ],
  providers: [
  ],
})
export class AsyncSelectModule { }
