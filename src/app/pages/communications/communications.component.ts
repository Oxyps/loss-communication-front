import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationModel, LOSS_CAUSES } from 'src/app/models/communication.model';
import { CommunicationsService } from 'src/app/services/communications.service';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.scss'],
})
export class CommunicationsComponent {
  title = 'Comunicações de perda';
  dataLoading: boolean = false;

  communications: CommunicationModel[] = [];

  pagination?: {
    previous_page: number | null,
    next_page: number | null,
    page_size: number,
    data_length: number,
  };
  current_page = 1;

  constructor(
    private communicationsService: CommunicationsService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadCommunications(this.current_page);
  }

  async loadCommunications(page: number, farmerCpf?: string): Promise<void> {
    this.dataLoading = true;

    this.communicationsService.findAll( {page, farmerCpf} ).toPromise()
      .then(response => {
        this.communications = response.data;
        this.pagination = {...response};
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.dataLoading = false;
      })
    ;
  }

  getLossCause(communication: CommunicationModel): string {
    return LOSS_CAUSES[communication.loss_cause] || 'Não identificado';
  }

  getAllPages(): number {
    return Math.ceil(this.pagination!.data_length / this.pagination!.page_size);
  }

  loadPreviousPage(): void {
    this.loadCommunications(this.pagination!.previous_page!);
    this.current_page--;
  }

  loadNextPage(): void {
    this.loadCommunications(this.pagination!.next_page!);
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

    await this.communicationsService.delete(id).toPromise()
      .then(() => {
        this.pushSnackBar(
          true,
          'Comunicação de perda deletada com sucesso!'
        );

        this.communications = this.communications.filter(
          farmer => farmer.id != id
        );
      })
      .catch(error => {
        this.pushSnackBar(
          false,
          'Comunicação de perda não pode ser deletada. Remova primeiro os registros que referenciam ela!'
        );
      })
      .finally(() => {
        this.dataLoading = false;

        this.loadCommunications(this.current_page);
      })
    ;
  }
}
