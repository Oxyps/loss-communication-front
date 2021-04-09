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
  title = 'Lavouras';
  dataLoading: boolean = false;

  tillages: TillageModel[] = [];

  pagination?: {
    previous_page: number | null,
    next_page: number | null,
    page_size: number,
    data_length: number,
  };
  current_page = 1;

  constructor(
    private tillageService: TillagesService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadTillages(this.current_page);
  }

  async loadTillages(page: number): Promise<void> {
    this.dataLoading = true;

    this.tillageService.findAll( {page} ).toPromise()
      .then(response => {
        this.tillages = response.data;
        this.pagination = {...response};
      })
      .catch(error => {
        // console.log(error);
      })
      .finally(() => {
        this.dataLoading = false;
      })
    ;
  }

  getAllPages(): number {
    return Math.ceil(this.pagination!.data_length / this.pagination!.page_size);
  }

  loadPreviousPage(): void {
    this.loadTillages(this.pagination!.previous_page!);
    this.current_page--;
  }

  loadNextPage(): void {
    this.loadTillages(this.pagination!.next_page!);
    this.current_page++;
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
    this.dataLoading = true;

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
      .catch(() => {
        this.pushSnackBar(
          false,
          'Lavoura não pode ser deletada. Remova primeiro os registros que referenciam ela!'
        );
      })
      .finally(() => {
        this.dataLoading = false;

        this.loadTillages(this.current_page);
      })
    ;
  }
}
