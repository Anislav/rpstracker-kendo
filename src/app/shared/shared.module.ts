import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { AvatarModule, CardModule } from '@progress/kendo-angular-layout';

import { PresetFilterComponent } from './components/preset-filter/preset-filter.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';


@NgModule({
    imports: [
        FormsModule,
        RouterModule,
        BrowserAnimationsModule,
        NgbModule,
        ButtonsModule,
        LabelModule,
        InputsModule,
        DropDownListModule,
        ListViewModule,
        AvatarModule,
        CardModule
    ],
    exports: [
        FormsModule,
        MainMenuComponent,
        SideMenuComponent,
        PresetFilterComponent,
        BrowserAnimationsModule,
        NgbModule,
        ButtonsModule,
        LabelModule,
        InputsModule,
        DropDownListModule,
        ListViewModule,
        AvatarModule,
        CardModule
    ],
    declarations: [
        MainMenuComponent,
        SideMenuComponent,
        PresetFilterComponent
    ],
    providers: [],
})
export class SharedModule { }
