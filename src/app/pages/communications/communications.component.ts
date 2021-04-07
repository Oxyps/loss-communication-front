import { Component } from '@angular/core';
import { CommunicationModel, LOSS_CAUSES } from 'src/app/models/communication.model';
import { CommunicationsService } from 'src/app/services/communications.service';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.scss'],
})
export class CommunicationsComponent {
  communications: CommunicationModel[] = [];

  constructor(
    private communicationsService: CommunicationsService,
  ) {}

  ngOnInit(): void {
    this.loadCommunications();
  }

  async loadCommunications(): Promise<void> {
    this.communicationsService.findAll().toPromise()
      .then(response => {
        this.communications = response;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    ;
  }

  getLossCause(communication: CommunicationModel): string {
    return LOSS_CAUSES[communication.loss_cause] || 'Não identificado';
  }
}
