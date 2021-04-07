import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FarmerModel } from 'src/app/models/farmer.model';
import { FarmersService } from 'src/app/services/farmers.service';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.scss'],
})
export class FarmersComponent implements OnInit {
  constructor(
    private farmersService: FarmersService,
    private _snackBar: MatSnackBar,
  ) {}

  farmers: FarmerModel[] = [];

  ngOnInit(): void {
    this.loadFarmers();
  }

  async loadFarmers(): Promise<void> {
    this.farmersService.findAll().toPromise()
      .then(response => {
        this.farmers = response;
      })
      .catch(error => {
        // console.log(error);
      })
    ;
  }

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

  async handleDelete(id: string | number) {
    await this.farmersService.delete(id).toPromise()
      .then(() => {
        this.pushSnackBar(
          true,
          'Agricultor deletado com sucesso!'
        );

        this.farmers = this.farmers.filter(
          farmer => farmer.id != id
        );
      })
      .catch(error => {
        this.pushSnackBar(
          false,
          'Agricultor não pode ser deletado. Remova primeiro os registros que referenciam ele!'
        );
      })
    ;
  }
}
