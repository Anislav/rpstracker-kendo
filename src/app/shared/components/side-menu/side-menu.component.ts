import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { DrawerMode, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { filter, Observable } from 'rxjs';

import { NavigationItem } from 'src/app/core/models/core';
import { Store } from 'src/app/core/state/app-store';

@Component({
    selector: 'app-side-menu',
    templateUrl: 'side-menu.component.html'
})
export class SideMenuComponent implements OnInit {

  public expanded$: Observable<boolean> = this.store.select('isMenuExpanded');
  public mode: DrawerMode = 'push';
  public mini = true;
  public autoCollapse = false;

  public items: Array<NavigationItem> = [
    {
      text: 'Dashboard',
      icon: 'k-icon k-i-chart-line-markers',
      path: '/dashboard',
      selected: false
    },
    {
      text: 'My Items',
      icon: 'k-i-star-outline k-i-bookmark-outline',
      path: '/backlog/my',
      selected: false
    },
    {
      text: 'Open Items',
      icon: 'k-i-checkbox k-i-shape-rect',
      path: '/backlog/open',
      selected: false
    },
    {
      text: 'Done Items',
      icon: 'k-i-checkbox-checked',
      path: '/backlog/closed',
      selected: false
    }
  ];

  constructor(
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.items = this.items.map(item => {
        item.selected = item.path == event.urlAfterRedirects;
        return item;
      });

    });

    this.setDrawerConfig();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.setDrawerConfig();
  }

  public setDrawerConfig() {
    if (window.innerWidth <= 770) {
      this.mode = 'overlay';
      this.mini = false;
      this.autoCollapse = true;
    } else {
        this.mode = 'push';
        this.mini = true;
        this.autoCollapse = false;
    }
  }

  public onSelect(event: DrawerSelectEvent) {
    this.router.navigate([event.item.path]);
  }

  public onCollapse() {
    this.store.set('isMenuExpanded', false);
  }
}
