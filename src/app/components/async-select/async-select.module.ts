import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AsyncSelectComponent } from './async-select.component';
import { SharedModules } from '../shared/shared-modules.module';

@NgModule({
  declarations: [
    AsyncSelectComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    MatAutocompleteModule,

    SharedModules,
  ],
  exports: [
    AsyncSelectComponent,

    MatProgressSpinnerModule,
    MatAutocompleteModule,
  ],
  providers: [
  ],
})
export class AsyncSelectModule { }
