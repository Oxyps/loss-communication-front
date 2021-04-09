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
  title = 'Agricultores';
  dataLoading: boolean = false;

  farmers: FarmerModel[] = [];

  pagination?: {
    previous_page: number | null,
    next_page: number | null,
    page_size: number,
    data_length: number,
  };
  current_page = 1;

  constructor(
    private farmersService: FarmersService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadFarmers(this.current_page);
  }

  async loadFarmers(page: number, cpf?: string): Promise<void> {
    this.dataLoading = true;

    this.farmersService.findAll( {page, cpf} ).toPromise()
      .then(response => {
        this.farmers = response.data;
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
    this.loadFarmers(this.pagination!.previous_page!);
    this.current_page--;
  }

  loadNextPage(): void {
    this.loadFarmers(this.pagination!.next_page!);
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
      .finally(() => {
        this.dataLoading = false;
      })
    ;
  }
}
