import { Component } from '@angular/core';
import { Store } from 'src/app/core/state/app-store';

@Component({
    selector: 'app-main-menu',
    templateUrl: 'main-menu.component.html',
})
export class MainMenuComponent {

  public isMenuExpanded$ = this.store.select('isMenuExpanded');

  constructor(private store: Store) {}

  onMenuButtonClick() {
    this.store.set('isMenuExpanded', !this.store.value.isMenuExpanded);
  }
 }
