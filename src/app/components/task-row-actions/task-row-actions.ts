import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-row-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-x-2 opacity-0 group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 flex">
      <button (click)="view.emit()" class="text-blue-600 hover:underline">View</button>
      <button (click)="edit.emit()" class="text-green-600 hover:underline">Edit</button>
      <button *ngIf="isAdmin" (click)="delete.emit()" class="text-red-600 hover:underline">Delete</button>
    </div>
  `,
  host: {
    class: 'relative group' // Needed for hover visibility of buttons
  }
})
export class TaskRowActionsComponent {
  @Input() isAdmin = false;
  @Output() view = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
