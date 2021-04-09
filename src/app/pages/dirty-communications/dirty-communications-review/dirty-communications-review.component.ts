import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommunicationsService } from 'src/app/services/communications.service';
import { CommunicationModel } from 'src/app/models/communication.model';
import { LOSS_CAUSES } from 'src/app/models/communication.model'
import { DefaultOptionType } from 'src/app/components/async-select/async-select.component';
import { FarmerModel } from 'src/app/models/farmer.model';
import { FarmersService } from 'src/app/services/farmers.service';
import { TillagesService } from 'src/app/services/tillages.service';
import { TillageModel } from 'src/app/models/tillage.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dirty-communications-review',
  templateUrl: './dirty-communications-review.component.html',
  styleUrls: ['./dirty-communications-review.component.scss'],
})
export class DirtyCommunicationsReviewComponent implements OnInit {
  dirtyCommunicationForm!: FormGroup;
  formAppearance: MatFormFieldAppearance = 'outline';

  title = 'Revisar comunicação de perda';
  dataLoading: boolean = false;
  communicationId = null;

  constructor(
    private _formBuilder: FormBuilder,
    private communicationsService: CommunicationsService,
    public farmersService: FarmersService,
    public tillagesService: TillagesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) {
    this.createCommunicationForm();
  }

  createCommunicationForm(): void {
    this.dirtyCommunicationForm = this._formBuilder.group({
      farmer: [null, [Validators.required]],
      tillage: [null, [Validators.required]],
      lossCause: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params?.id) {
        this.communicationId = params.id;
        this.loadDirtyCommunication(params.id);
      }
    });
  }

  async loadDirtyCommunication(id: number | string): Promise<void> {
    this.dataLoading = true;

    await this.communicationsService.findById(id).toPromise()
      .then(response => {
        this.dirtyCommunicationForm.setValue({
          farmer: response.farmer,
          tillage: response.tillage,
          lossCause: {
            key: response.loss_cause,
            value: LOSS_CAUSES[response.loss_cause]
          },
          isDirty: response.is_dirty,
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

  displayFunctionFarmer(option: FarmerModel): string {
    return option ? `${option.id} - ${option.name} - ${option.cpf}` : '';
  }

  displayFunctionTillage(option: TillageModel): string {
    if (option) {
      const dp = new DatePipe('pt_BR');

      const tillageDate = dp.transform(
        option.harvest_date,
        'dd/MM/yyyy',
      );

      return `${option.id} - ${option.type} - ${tillageDate}`;
    }

    return '';
  }

  LOSS_CAUSES = Object.keys(LOSS_CAUSES).map(
    key => ( {key, value: LOSS_CAUSES[key]} )
  );

  displayFunctionLossCause(option: DefaultOptionType): string {
    return option ? option.value : '';
  }

  toggleIsDirty(): void {
    const value = this.dirtyCommunicationForm.get('isDirty')!.value;

    console.log(!value);
    this.dirtyCommunicationForm.get('isDirty')!.setValue(!value);
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
    console.log(this.dirtyCommunicationForm);

    if (this.dirtyCommunicationForm.invalid) {
      this.dirtyCommunicationForm.markAllAsTouched();
    } else {
      // const formValue = this.dirtyCommunicationForm.getRawValue();

      // const communication: CommunicationModel = {
      //   id: this.communicationId ? this.communicationId! : undefined,
      //   farmer: formValue.farmer.id,
      //   tillage: formValue.tillage.id,
      //   loss_cause: formValue.lossCause.key,
      //   is_dirty: false,
      // }

      // this.dataLoading = true;

      // await this.communicationsService.save(communication).toPromise()
      //   .then(() => {
      //     this.pushSnackBar(true, 'Comunicação de perda cadastrada com sucesso!');
      //     this.router.navigate(['/comunicacoes-perda']);
      //   })
      //   .catch(response => {
      //     let message = '';

      //     switch (response.status) {
      //       case 409:
      //         message = 'A lavoura escolhida pode já ter sido cadastrada em outra comunicação de perda.'
      //       break;
      //       default:
      //         message = 'Algo inesperado aconteceu. Contate o suporte.';
      //       break;
      //     }

      //     this.pushSnackBar(false, message);
      //   })
      //   .finally(() => {
      //     this.dataLoading = false;
      //   })
      // ;
    }
  }
}
