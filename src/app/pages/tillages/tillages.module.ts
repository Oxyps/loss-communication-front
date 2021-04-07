import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';

import { TillagesComponent } from './tillages.component';
import { TillageFormComponent } from './tillage-form/tillage-form.component';

import { TillagesRoutingModule } from './tillages-routing.module';

import { TillagesService } from 'src/app/services/tillages.service';
import { LocationService } from 'src/app/services/location.service';

@NgModule({
  declarations: [
    TillagesComponent,
    TillageFormComponent,
  ],
  imports: [
    CommonModule,
    TillagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    // MatMomentDateModule,
  ],
  providers: [
    TillagesService,
    LocationService,
  ]
})
export class TillagesModule { }
