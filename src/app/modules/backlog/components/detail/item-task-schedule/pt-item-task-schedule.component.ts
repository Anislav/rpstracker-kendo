import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { SchedulerEvent, SaveEvent, RemoveEvent, CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';

import { PtTask } from '../../../../../core/models/domain';
import { PtNewTask, PtTaskUpdate } from '../../../../../shared/models/dto';
import { EMPTY_STRING } from '../../../../../core/helpers/string-helpers';

@Component({
  selector: 'app-item-task-schedule',
  templateUrl: 'pt-item-task-schedule.component.html',
  styleUrls: ['pt-item-task-schedule.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemTaskScheduleComponent implements OnInit {

  @Input() public tasks$: BehaviorSubject<PtTask[]> = new BehaviorSubject<PtTask[]>([]);

  @Output() addNewTask = new EventEmitter<PtNewTask>();
  @Output() updateTask = new EventEmitter<PtTaskUpdate>();

  public newTaskTitle = EMPTY_STRING;

  public displayDate = new Date();
  public startTime = '07:00';
  public events: SchedulerEvent[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public ngOnInit() {
    this.tasks$.subscribe(tasks => {
      const events = tasks.filter(t => t.dateStart && t.dateEnd).map(t => {
        const evt: SchedulerEvent = {
          id: t.id,
          title: t.title ? t.title : '',
          start: t.dateStart ? t.dateStart : new Date(),
          end: t.dateEnd ? t.dateEnd : new Date(),
          isAllDay: false
        };
        return evt;
      });

      if (events.length > 0) {
        this.events = events;
        const minDate = new Date(Math.min.apply(null, events.map((e) => new Date(e.start).valueOf())));
        this.displayDate = minDate;
      }
    });
  }

  public createFormGroup({ dataItem, isNew }: CreateFormGroupArgs): FormGroup {
    return this.formBuilder.group({
      id: isNew ? this.getNextId() : dataItem.id,
      title: dataItem.title,
      start: [dataItem.start, Validators.required],
      end: [dataItem.end, Validators.required],
    });
  }

  public getNextId(): number {
    const len = this.events.length;
    return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
  }

  public onSave({ formGroup, isNew, dataItem }: SaveEvent) {
    if (formGroup.invalid) {
      return;
    }

    if (isNew) {
      const newTask: PtNewTask = {
        title: formGroup.value.title,
        completed: false,
        dateStart: formGroup.value.start,
        dateEnd: formGroup.value.end,
      };

      this.addNewTask.emit(newTask);
    } else {
      const taskToUpdate = this.tasks$.value.find(t => t.id === dataItem.id);

      if (taskToUpdate) {
        const taskUpdate: PtTaskUpdate = {
          task: {
            ...taskToUpdate,
            title: formGroup.controls.title.value,
            dateStart: formGroup.value.start,
            dateEnd: formGroup.value.end,
          },
          toggle: false
        };

        this.updateTask.emit(taskUpdate);
      }
    }
  }

  public onRemove({ dataItem }: RemoveEvent) {
    const taskToDelete = this.tasks$.value.find(t => t.id === dataItem.id);
    if (taskToDelete) {
      const taskUpdate: PtTaskUpdate = {
        task: taskToDelete,
        toggle: false,
        delete: true
      };

      this.updateTask.emit(taskUpdate);
    }
  }

}
