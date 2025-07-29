import { Component, computed, signal, effect } from '@angular/core';
import { TASKS, USERS, PROJECTS } from '../services/mock-data';
import { currentUserSignal } from '../services/user-context';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
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
  }
  setStatus(status: string) {
    this.filterStatus(status || null);
  }
  setAssignee(id: string) {
    this.filterAssigneeId(id ? +id : null);
  }
}
