import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TillagesService } from 'src/app/services/tillages.service';
import { LocationService } from 'src/app/services/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TillageModel } from 'src/app/models/tillage.model';
import { PtBrDatepicker } from 'src/app/components/adapters/ptbr-datepicker';

@Component({
  selector: 'app-tillages-form',
  templateUrl: './tillages-form.component.html',
  styleUrls: ['./tillages-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PtBrDatepicker },
  ],
})
export class TillagesFormComponent implements OnInit {
  tillageForm!: FormGroup;
  formAppearance: MatFormFieldAppearance = 'outline';

  isEditMode = false;
  tillageId = null;

  constructor(
    private _formBuilder: FormBuilder,
    private tillageService: TillagesService,
    private locationService: LocationService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) {
    this.createTillageForm();
  }

  createTillageForm(): void {
    this.tillageForm = this._formBuilder.group({
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      type: ['', [Validators.required]],
      harvestDate: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params?.id) {
        this.isEditMode = true;
        this.tillageId = params.id;
        this.loadTillage(params.id);
      } else {
        this.loadDeviceLocation();
      }
    });
  }

  async loadTillage(id: number | string): Promise<void> {
    await this.tillageService.findById(id).toPromise()
      .then(response => {
        const date = new Date(response.harvest_date);
        date.setHours(24);

        this.tillageForm.setValue({
          longitude: response.longitude,
          latitude: response.latitude,
          type: response.type,
          harvestDate: date,
        });
      })
      .catch(error => {
        // console.log(error);
      })
    ;
  }

  async loadDeviceLocation(): Promise<void> {
    await this.locationService.findDevicePosition()
      .then(response => {
        this.tillageForm.get('latitude')!.setValue(response.lat);
        this.tillageForm.get('longitude')!.setValue(response.lng);

        this.tillageForm.get('latitude')!.disable();
        this.tillageForm.get('longitude')!.disable();
      })
      .catch(error => {
        // console.log(error);
      })
    ;
  }

  getLocationPoint(longitude: number | string, latitude: number | string): string {
    return `POINT(${longitude} ${latitude})`;
  }

  getFormatedDate(unformated: Date | string): string {
    let date = new Date(unformated);

    return date.toISOString().slice(0, 10);
  }

  pushSnackBar(success: boolean, message: string): void {
    this._snackBar.open(
      message,
      'x', {
        duration: 5000,
        panelClass: [success ? 'success-snackbar' : 'error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
    );
  }

  async handleSubmit(): Promise<void> {
    if (this.tillageForm.invalid) {
      this.tillageForm.markAllAsTouched();
    } else {
      const formValue = this.tillageForm.getRawValue();

      const tillage: TillageModel = {
        id: this.tillageId ? this.tillageId! : undefined,
        location: this.getLocationPoint(formValue.longitude, formValue.latitude),
        type: formValue.type,
        harvest_date: this.getFormatedDate(formValue.harvestDate),
      }

      await this.tillageService.save(tillage).toPromise()
        .then(() => {
          this.pushSnackBar(true, 'Lavoura cadastrada com sucesso!');
          this.router.navigate(['/lavouras']);
        })
        .catch(error => {
          this.pushSnackBar(false, 'Algo inesperado aconteceu. Não foi possível cadastrar.');
        })
      ;
    }
  }
}
