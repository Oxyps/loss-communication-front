import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NavService } from './nav-service';

interface RouteItem {
  displayName: string;
  iconName?: string;
  link?: string;
  nestedRoutes?: RouteItem[]
}

@Component({
  selector: 'app-nav-list-item',
  templateUrl: './nav-list-item.component.html',
  styleUrls: ['./nav-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(-90deg)'})),
      transition('expanded <=> collapsed',
        animate('300ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavListItemComponent implements OnInit {
  expanded: boolean = false;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: RouteItem;
  @Input() depth!: number;

  constructor(
    public router: Router,
    public navService: NavService
  ) {}

  ngOnInit(): void {
    this.navService.currentUrl.subscribe((url: string) => {
      this.expanded = url.indexOf(`/${this.item.link}`) === 0;
    });
  }

  onItemSelected() {
    if (!this.item.nestedRoutes || !this.item.nestedRoutes.length) {
      this.router.navigate([this.item.link]);

      if (this.navService.mode === 'over') {
        this.navService.closeNav();
      }
    } else {
      this.expanded = !this.expanded;
    }
  }
}
