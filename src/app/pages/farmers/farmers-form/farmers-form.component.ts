import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';

import { FarmersService } from 'src/app/services/farmers.service';
import { FarmerModel } from 'src/app/models/farmer.model';

@Component({
  selector: 'app-farmers-form',
  templateUrl: './farmers-form.component.html',
  styleUrls: ['./farmers-form.component.scss'],
  providers: [],
})
export class FarmersFormComponent implements OnInit {
  farmerForm!: FormGroup;
  formAppearance: MatFormFieldAppearance = 'outline';

  title = 'Agricultor';
  dataLoading: boolean = false;
  isEditMode = false;
  farmerId = null;

  constructor(
    private _formBuilder: FormBuilder,
    private validateBrService: ValidateBrService,
    private farmerService: FarmersService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) {
    this.createFarmerForm();
  }

  createFarmerForm(): void {
    this.farmerForm = this._formBuilder.group({
      cpf: ['', [
        Validators.required,
        this.validateBrService.cpf,
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params?.id) {
        this.isEditMode = true;
        this.farmerId = params.id;
        this.loadFarmer(params.id);
      }
    });
  }

  async loadFarmer(id: number | string): Promise<void> {
    this.dataLoading = true;

    await this.farmerService.findById(id).toPromise()
      .then(response => {
        this.farmerForm.setValue({
          cpf: response.cpf,
          email: response.email,
          name: response.name,
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.dataLoading = false;
      })
    ;
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
    if (this.farmerForm.invalid) {
      this.farmerForm.markAllAsTouched();
    } else {
      const formValue = this.farmerForm.getRawValue();

      const farmer: FarmerModel = {
        id: this.farmerId ? this.farmerId! : undefined,
        cpf: formValue.cpf,
        email: formValue.email,
        name: formValue.name,
      }

      this.dataLoading = true;

      await this.farmerService.save(farmer).toPromise()
        .then(() => {
          this.pushSnackBar(true, 'Agricultor cadastrado com sucesso!');
          this.router.navigate(['/agricultores']);
        })
        .catch(response => {
          let message = '';

          switch (response.status) {
            case 400:
              if (response.error['cpf']?.length > 0) {
                message = 'Esse CPF já foi utilizado.';
              } else if (response.error['email']?.length > 0) {
                message = 'Preencha um e-mail válido.';
              } else {
                message = 'Preencha corretamene todos os campos';
              }
            break;
            default:
              message = 'Algo inesperado aconteceu. Contate o suporte.';
            break;
          }

          this.pushSnackBar(false, message);
        })
        .finally(() => {
          this.dataLoading = false;
        })
      ;
    }
  }
}
