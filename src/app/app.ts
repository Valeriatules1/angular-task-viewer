import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { TaskService } from './services/task.service';
import { RoleService } from './services/role.service';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskFiltersComponent } from './components/task-filters/task-filters';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskFiltersComponent],
  template: `
    <div class="md:top-6 p-4 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 transition-colors">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Role-Based Task View</h1>
        <button (click)="roleService.toggleRole()" class="btn btn-primary">
          Switch to {{ (currentRole() === 'ADMIN') ? 'Worker' : 'Admin' }}
        </button>
      </div>

      <app-task-filters
        *ngIf="currentRole() === 'ADMIN'"
        [projects]="projects"
        [statuses]="statuses"
        [assignees]="assignees"
        (projectChange)="updateFilter('project', $event)"
        (statusChange)="updateFilter('status', $event)"
        (assigneeChange)="updateFilter('assignee', $event)"
      ></app-task-filters>

      <app-task-list
        [tasks]="filteredAndRoleFilteredTasks()"
        [isAdmin]="currentRole() === 'ADMIN'"
      ></app-task-list>
    </div>
  `
})
export class AppComponent {
  private taskService = inject(TaskService);
  roleService = inject(RoleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Use a single signal for queryParams
  private queryParamsSignal = toSignal(this.route.queryParams);

  currentRole = this.roleService.currentRole;

  projects = ['Alpha', 'Angular', 'React', 'PHP', 'Laravel', 'Android', 'Python', 'C#', 'Vue', 'Next'];
  statuses = ['Open', 'In Progress', 'Done'];
  assignees = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  filteredAndRoleFilteredTasks = computed(() => {
    const role = this.currentRole();
    let filtered = this.taskService.filteredTasks();
    if (role === 'WORKER') {
      filtered = filtered.filter(t => t.assigneeId === 2);
    }
    return filtered;
  });

  /*constructor() {
    effect(() => {
      const params = this.queryParamsSignal();
      this.taskService.filterProject.set(params['project']?.toString() || null);
      this.taskService.filterStatus.set(params['status']?.toString() || null);
      const assignee = params['assignee'];
      this.taskService.filterAssignee.set(
        assignee != null && assignee !== '' ? +assignee : null
      );
    });
  }*/

  updateFilter(type: 'project' | 'status' | 'assignee', value: string | number | null) {
    if (type === 'project') this.taskService.filterProject.set(value as string | null);
    else if (type === 'status') this.taskService.filterStatus.set(value as string | null);
    else if (type === 'assignee') this.taskService.filterAssignee.set(value as number | null);

    // Update URL query params
    const queryParams: Record<string, string | number | null> = {
      project: this.taskService.filterProject() || null,
      status: this.taskService.filterStatus() || null,
      assignee: this.taskService.filterAssignee() || null,
    };

    // Remove null/undefined keys
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] == null) delete queryParams[key];
    });

    this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge' });
  }
}
