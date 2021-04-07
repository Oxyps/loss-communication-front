import { Component, OnInit } from '@angular/core';

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
  ) {}

  farmers: FarmerModel[] = [];

  ngOnInit(): void {
    this.loadFarmers();
  }

  async loadFarmers(): Promise<void> {
    this.farmersService.findAll().toPromise()
      .then(response => {
        this.farmers = response;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    ;
  }
}
