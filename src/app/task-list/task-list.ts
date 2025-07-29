import { Component, computed, signal, effect } from '@angular/core';
import { TASKS, USERS, PROJECTS } from '../services/mock-data';
import { currentUserSignal } from '../services/user-context';
import { Router, ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);

  tasks = signal(TASKS);
  users = USERS;
  projects = PROJECTS;
  currentUser = currentUserSignal;

  // Filter signals (Admin only)
  filterProjectId = signal<number | null>(null);
  filterStatus = signal<string | null>(null);
  filterAssigneeId = signal<number | null>(null);

  // Helper to get names
  userName = (id: number) => this.users.find(u => u.id === id)?.name ?? '—';
  projectName = (id: number) => this.projects.find(p => p.id === id)?.name ?? '—';

  // Computed filtered tasks
  filteredTasks = computed(() => {
    const user = this.currentUser();
    let data = this.tasks();

    if (user.role === 'Worker') {
      data = data.filter(t => t.assigneeId === user.id);
    } else {
      if (this.filterProjectId()) {
        data = data.filter(t => t.projectId === this.filterProjectId());
      }
      if (this.filterStatus()) {
        data = data.filter(t => t.status === this.filterStatus());
      }
      if (this.filterAssigneeId()) {
        data = data.filter(t => t.assigneeId === this.filterAssigneeId());
      }
    }
    return data;
  });

  // Filter handlers
  setProject(id: string) {
    this.filterProjectId(id ? +id : null);
    this.pushQueryParams();
  }
  setStatus(status: string) {
    this.filterStatus(status || null);
    this.pushQueryParams();
  }
  setAssignee(id: string) {
    this.filterAssigneeId(id ? +id : null);
    this.pushQueryParams();
  }

  // Helper function:
  pushQueryParams() {
    if (this.currentUser().role !== 'Admin') return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        projectId: this.filterProjectId() || undefined,
        status: this.filterStatus() || undefined,
        assigneeId: this.filterAssigneeId() || undefined,
      },
      queryParamsHandling: 'merge'
    });
  }


  constructor() {
  // sync filter state from URL on init (Admin only)
  if (this.currentUser().role === 'Admin') {
    this.route.queryParams.subscribe(params => {
      this.filterProjectId(params['projectId'] ? +params['projectId'] : null);
      this.filterStatus(params['status'] || null);
      this.filterAssigneeId(params['assigneeId'] ? +params['assigneeId'] : null);
    });
  }
}
}
