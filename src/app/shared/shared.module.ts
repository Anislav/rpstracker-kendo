import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonsModule, ButtonGroupModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ComboBoxModule, DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { AvatarModule, CardModule, DrawerModule, TabStripModule, TileLayoutModule } from '@progress/kendo-angular-layout';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { GridModule } from '@progress/kendo-angular-grid';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';


const KENDO_MODULES = [
  ButtonsModule,
  ButtonGroupModule,
  LabelModule,
  InputsModule,
  ComboBoxModule,
  DropDownListModule,
  ListViewModule,
  AvatarModule,
  CardModule,
  DrawerModule,
  TabStripModule,
  TileLayoutModule,
  AppBarModule,
  GridModule,
  SchedulerModule,
  DialogsModule,
  ChartsModule
]

@NgModule({
    imports: [
        FormsModule,
        BrowserAnimationsModule,
        RouterModule,
        ...KENDO_MODULES,
    ],
    exports: [
        FormsModule,
        BrowserAnimationsModule,
        MainMenuComponent,
        SideMenuComponent,
        ...KENDO_MODULES
    ],
    declarations: [
        MainMenuComponent,
        SideMenuComponent,
    ],
    providers: [],
})
export class SharedModule { }
