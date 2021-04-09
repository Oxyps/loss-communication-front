import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'agricultores',
        loadChildren: () => {
          return import('./pages/farmers/farmers.module')
            .then(m => m.FarmersModule)
          ;
        }
      },
      {
        path: 'lavouras',
        loadChildren: () => {
          return import('./pages/tillages/tillages.module')
            .then(m => m.TillagesModule)
          ;
        }
      },
      {
        path: 'comunicacoes-perda',
        children: [
          {
            path: 'revisadas',
            loadChildren: () => {
              return import('./pages/communications/communications.module')
                .then(m => m.CommunicationsModule)
              ;
            }
          },
          {
            path: 'nao-revisadas',
            loadChildren: () => {
              return import('./pages/dirty-communications/dirty-communications.module')
                .then(m => m.DirtyCommunicationsModule)
              ;
            }
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
