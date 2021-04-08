import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';

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

  navigationRoutes = [
    { displayName: 'Agricultores', link: '/agricultores', iconName: '' },
    { displayName: 'Lavouras', link: '/lavouras', iconName: '' },
    { displayName: 'Comunicações de perda', link: '/comunicacoes-perda', iconName: '' },
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
