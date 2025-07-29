import { Component, computed, signal } from '@angular/core';
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

  // Helper to get user/project names by id
  userName = (id: number) => this.users.find(u => u.id === id)?.name ?? '—';
  projectName = (id: number) => this.projects.find(p => p.id === id)?.name ?? '—';

  // Later, filtering logic will go here
}
