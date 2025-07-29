import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-4 mb-4">
      <select (change)="onProjectChange($event)" class="border p-2 rounded">
        <option value="">All Projects</option>
        <option *ngFor="let project of projects" [value]="project">{{ project }}</option>
      </select>

      <select (change)="onStatusChange($event)" class="border p-2 rounded">
        <option value="">All Statuses</option>
        <option *ngFor="let status of statuses" [value]="status">{{ status }}</option>
      </select>

      <select (change)="onAssigneeChange($event)" class="border p-2 rounded">
        <option value="">All Assignees</option>
        <option *ngFor="let assignee of assignees" [value]="assignee.id">{{ assignee.name }}</option>
      </select>
    </div>
  `
})
export class TaskFiltersComponent {
  @Input() projects: string[] = [];
  @Input() statuses: string[] = [];
  @Input() assignees: { id: number; name: string }[] = [];

  @Output() projectChange = new EventEmitter<string | null>();
  @Output() statusChange = new EventEmitter<string | null>();
  @Output() assigneeChange = new EventEmitter<number | null>();

  onProjectChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value || null;
    this.projectChange.emit(val);
  }

  onStatusChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value || null;
    this.statusChange.emit(val);
  }

  onAssigneeChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.assigneeChange.emit(val ? +val : null);
  }
}
