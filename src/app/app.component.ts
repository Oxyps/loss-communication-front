import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TillageService } from './services/tillage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'loss-communication-front';

  constructor(
    private tillageService: TillageService,
  ) {}

  ngOnInit(): void {
    this.loadTillages();
  }

  async loadTillages(): Promise<void> {
    this.tillageService.findAll().toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    ;
  }
}
