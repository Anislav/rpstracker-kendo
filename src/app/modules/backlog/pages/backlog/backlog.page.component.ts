import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDataResult, SelectableSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { State, process, } from '@progress/kendo-data-query';

import { NavigationService } from 'src/app/core/services';
import { BacklogService } from '../../services/backlog.service';
import { PtItem } from 'src/app/core/models/domain';
import { PresetType } from 'src/app/core/models/domain/types';
import { PtNewItem } from 'src/app/shared/models/dto';
import { EMPTY_STRING } from 'src/app/core/helpers';
import { ItemType } from 'src/app/core/constants';
import { Store } from 'src/app/core/state/app-store';
import { PriorityEnum } from 'src/app/core/models/domain/enums';

@Component({
    selector: 'app-backlog',
    templateUrl: 'backlog.page.component.html',
    styleUrls: ['backlog.page.component.css']
})
export class BacklogPageComponent implements OnInit {

  private itemsSub: Subscription | undefined;
  public items$: BehaviorSubject<PtItem[]> = new BehaviorSubject<PtItem[]>([]);
  public currentPreset: PresetType = 'open';
  public gridData: GridDataResult | undefined;

  public gridState: State = {
      skip: 0,
      take: 10,
      sort: [],
      group: []
  };

  public checkboxOnly = false;
  public selectableSettings: SelectableSettings | undefined;

  public itemTypesProvider = ItemType.List.map((t) => t.PtItemType);
  public newItem: PtNewItem | undefined;

  constructor(
      private activatedRoute: ActivatedRoute,
      private navigationService: NavigationService,
      private backlogService: BacklogService,
      private modalService: NgbModal,
      private store: Store
  ) { }

  public ngOnInit() {

    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
    };

    this.items$.subscribe((items: PtItem[]) => {
        this.gridData = process(items, this.gridState);
    });

    this.activatedRoute.params.subscribe(params => {
      if (this.itemsSub) {
        this.itemsSub.unsubscribe();
      }

      const reqPreset = params['preset'] as PresetType;
      if (reqPreset) {
        this.currentPreset = reqPreset;
      }

      this.itemsSub = this.backlogService.getItems(this.currentPreset)
        .subscribe(items => {
            this.items$.next(items);
        });
    });

    this.resetModalFields();
  }

  public onSelectPresetTap(preset: PresetType) {
    this.navigationService.navigate(['backlog', preset]);
  }

  public onAddTap(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (typeof result === 'object') {
        if (this.store.value.currentUser) {
            this.backlogService.addNewPtItem(result, this.store.value.currentUser)
                .then(nextItem => {
                    this.items$.next([nextItem, ...this.items$.value]);
                });
        }

        this.resetModalFields();
      }
    }, (reason) => {

    });
  }

  private resetModalFields() {
    this.newItem = {
      title: EMPTY_STRING,
      description: EMPTY_STRING,
      type: 'PBI'
    };
  }

  public onDataStateChange(newState: State) {
    this.gridState = newState;
    this.refresh();
  }

  private refresh() {
    this.itemsSub = this.backlogService.getItems(this.currentPreset)
        .subscribe((items: PtItem[]) => {
          this.items$.next(items);
        });
  }

  public onSelectionChange(args: SelectionEvent) {
    if (args.selectedRows) {
      const selItem = args.selectedRows[0].dataItem as PtItem;
      this.navigationService.navigate(['/detail', selItem.id]);
    }
  }

  public getIndicatorImage(item: PtItem) {
    return ItemType.imageResFromType(item.type);
  }

  public getPriorityClass(item: PtItem): string {
    const indicatorClass = PriorityEnum.getIndicatorClass(item.priority);
    return indicatorClass;
  }

}
