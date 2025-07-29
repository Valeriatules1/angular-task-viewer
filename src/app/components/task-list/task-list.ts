import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRowActionsComponent } from '../task-row-actions/task-row-actions';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskRowActionsComponent],
  template: `
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-2 border border-gray-300">Title</th>
            <th class="p-2 border border-gray-300 hidden sm:table-cell">Status</th>
            <th class="p-2 border border-gray-300 hidden md:table-cell">Assignee</th>
            <th class="p-2 border border-gray-300 hidden lg:table-cell">Deadline</th>
            <th class="p-2 border border-gray-300 hidden lg:table-cell">Project</th>
            <th class="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let task of tasks" class="hover:bg-gray-50 group relative">
            <td class="p-2 border border-gray-300">{{ task.title }}</td>
            <td class="p-2 border border-gray-300 hidden sm:table-cell">{{ task.status }}</td>
            <td class="p-2 border border-gray-300 hidden md:table-cell">{{ getAssigneeName(task.assigneeId) }}</td>
            <td class="p-2 border border-gray-300 hidden lg:table-cell">{{ task.deadline | date }}</td>
            <td class="p-2 border border-gray-300 hidden lg:table-cell">{{ task.projectName }}</td>
            <td class="p-2 border border-gray-300 lg:table-cell relative">
              <app-task-row-actions
                [isAdmin]="isAdmin"
                (view)="onView(task)"
                (edit)="onEdit(task)"
                (delete)="onDelete(task)"
              ></app-task-row-actions>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() isAdmin = false;

  // This would come from a users list in real service
  getAssigneeName(id: number): string {
    // Example; replace with data from service or inputs
    return id === 1 ? 'Alice' : id === 2 ? 'Bob' : 'Unknown';
  }

  onView(task: Task) { alert(`Viewing task ${task.title}`); }
  onEdit(task: Task) { alert(`Editing task ${task.title}`); }
  onDelete(task: Task) {
    if (this.isAdmin && confirm(`Delete task ${task.title}?`)) {
      alert(`Deleted task ${task.title}`);
      // Implement delete logic via service in full code
    }
  }
}
