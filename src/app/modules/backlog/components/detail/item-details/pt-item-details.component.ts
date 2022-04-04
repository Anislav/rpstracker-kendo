import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { PtItem, PtUser } from 'src/app/core/models/domain';
import { PtItemDetailsEditFormModel, ptItemToFormModel } from 'src/app/shared/models/forms';
import { PtItemType } from 'src/app/core/models/domain/types';
import { PriorityEnum } from 'src/app/core/models/domain/enums';
import { ItemType, PT_ITEM_STATUSES, PT_ITEM_PRIORITIES } from 'src/app/core/constants';
import { Store } from 'src/app/core/state/app-store';

@Component({
    selector: 'app-item-details',
    templateUrl: 'pt-item-details.component.html',
    styleUrls: ['pt-item-details.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemDetailsComponent implements OnInit {

    @Input() item: PtItem | undefined;
    @Output() itemSaved = new EventEmitter<PtItem>();
    @Output() usersRequested = new EventEmitter<string>();

    public users$: Observable<PtUser[]> = this.store.select<PtUser[]>('users');

    public selectedAssignee: PtUser | undefined;

    public itemForm: PtItemDetailsEditFormModel = ptItemToFormModel();
    public itemTypesProvider = ItemType.List.map((t) => t.PtItemType);
    public statusesProvider = PT_ITEM_STATUSES;
    public prioritiesProvider = PT_ITEM_PRIORITIES;

    public assigneePickerDisplayed = false;

    constructor(
        private store: Store,
    ) { }

    public ngOnInit() {
        if (this.item) {
            this.itemForm = ptItemToFormModel(this.item);
            this.selectedAssignee = this.item.assignee;
        }
    }

    public getPriorityClass(priority: PriorityEnum): string {
      const indicatorClass = PriorityEnum.getIndicatorClass(priority);
      return indicatorClass;
    }

    public getIndicatorImage(itemType: PtItemType) {
      return ItemType.imageResFromType(itemType);
    }

    public onBlurTextField() {
        this.notifyUpdateItem();
    }

    public onDropdownChange() {
        this.notifyUpdateItem();
    }

    public openAssigneePicker() {
      this.usersRequested.emit();
      this.assigneePickerDisplayed = true;
    }

    public onSelectAssignee(user: PtUser) {
      this.selectedAssignee = user;
      this.itemForm.assigneeName = user.fullName;
      this.notifyUpdateItem();

      this.assigneePickerDisplayed = false;
    }

    public onCloseAssigneePicker() {
      this.assigneePickerDisplayed = false;
    }

    private notifyUpdateItem() {
        const updatedItem = this.getUpdatedItem();
        this.itemSaved.emit(updatedItem);
    }

    private getUpdatedItem(): PtItem | undefined {

        if (!this.itemForm) {
            return undefined;
        }
        const updatedItem = Object.assign({}, this.item, {
            title: this.itemForm.title,
            description: this.itemForm.description,
            type: this.itemForm.typeStr,
            status: this.itemForm.statusStr,
            priority: this.itemForm.priorityStr,
            estimate: this.itemForm.estimate,
            assignee: this.selectedAssignee
        });
        return updatedItem;
    }


}
