import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { RouteItem } from './nav-list-item/nav-list-item.component';

import { NavService } from './nav-list-item/nav-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: ElementRef;

  drawerMode: 'over' | 'side' | 'push' = 'side';

  media$: Observable<MediaChange[]>;

  navigationRoutes: RouteItem[] = [
    {
      displayName: 'Cadastros',
      link: '',
      nestedRoutes: [
        { displayName: 'Agricultores', link: '/agricultores', iconName: 'person' },
        { displayName: 'Lavouras', link: '/lavouras', iconName: 'grass' },
        { displayName: 'Comunicações de perda', link: '/comunicacoes-perda', iconName: 'info' },
      ]
    },
  ];

  constructor(
    private media: MediaObserver,
    private navService: NavService
  ) {
    this.media$ = this.media.asObservable();
  }

  ngAfterViewInit(): void {
    this.media$.subscribe(mq => {
      if (mq[0].mqAlias === 'lg' || mq[0].mqAlias === 'xl') {
        this.drawerMode = 'side';
      } else {
        this.drawerMode = 'over';
      }

      this.navService.mode = this.drawerMode;
    });

    this.navService.drawer = this.drawer;
  }
}
