import { PtListComponent, PtListItemComponent } from './backlog';
import { PtItemDetailsComponent } from './detail/item-details/pt-item-details.component';
import { PtItemTasksComponent } from './detail/item-tasks/pt-item-tasks.component';
import { PtItemChitchatComponent } from './detail/item-chitchat/pt-item-chitchat.component';

export * from './backlog';
export * from './detail/item-details/pt-item-details.component';
export * from './detail/item-tasks/pt-item-tasks.component';
export * from './detail/item-chitchat/pt-item-chitchat.component';

export const COMPONENTS = [
    PtItemDetailsComponent,
    PtListComponent,
    PtListItemComponent,
    PtItemTasksComponent,
    PtItemChitchatComponent
];
