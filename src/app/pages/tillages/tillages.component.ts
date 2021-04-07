import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TillageModel } from 'src/app/models/tillage.model';
import { TillagesService } from 'src/app/services/tillages.service';

@Component({
  selector: 'app-tillages',
  templateUrl: './tillages.component.html',
  styleUrls: ['./tillages.component.scss'],
})
export class TillagesComponent implements OnInit {
  constructor(
    private tillageService: TillagesService,
    private _snackBar: MatSnackBar,
  ) {}

  tillages: TillageModel[] = [];

  ngOnInit(): void {
    this.loadTillages();
  }

  async loadTillages(): Promise<void> {
    this.tillageService.findAll().toPromise()
      .then(response => {
        this.tillages = response;
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
    await this.tillageService.delete(id).toPromise()
      .then(() => {
        this.pushSnackBar(
          true,
          'Lavoura deletada com sucesso!'
        );

        this.tillages = this.tillages.filter(
          tillage => tillage.id != id
        );
      })
      .catch(error => {
        this.pushSnackBar(
          false,
          'Lavoura não pode ser deletada. Remova primeiro os registros que referenciam ela!'
        );
      })
    ;
  }
}
