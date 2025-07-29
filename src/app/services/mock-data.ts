import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';

export const USERS: User[] = [
  { id: 1, name: 'Alice', role: 'Worker' },
  { id: 2, name: 'Bob', role: 'Worker' },
  { id: 3, name: 'Charlie', role: 'Admin' },
];

export const PROJECTS: Project[] = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
];

export const TASKS: Task[] = [
  { id: 1, title: 'Fix login bug', status: 'Open', assigneeId: 1, deadline: '2025-08-02', projectId: 1 },
  { id: 2, title: 'Design dashboard', status: 'In Progress', assigneeId: 2, deadline: '2025-08-04', projectId: 1 },
  { id: 3, title: 'Deploy v2.0', status: 'Completed', assigneeId: 1, deadline: '2025-08-06', projectId: 2 },
  { id: 4, title: 'Create onboarding doc', status: 'Open', assigneeId: 1, deadline: '2025-08-08', projectId: 1 },
  { id: 5, title: 'Update tests', status: 'In Progress', assigneeId: 2, deadline: '2025-08-10', projectId: 2 },
  { id: 6, title: 'Sprint planning', status: 'Open', assigneeId: 3, deadline: '2025-08-12', projectId: 2 },
  { id: 7, title: 'Review code', status: 'Completed', assigneeId: 1, deadline: '2025-08-14', projectId: 1 },
  { id: 8, title: 'Database migration', status: 'Open', assigneeId: 2, deadline: '2025-08-16', projectId: 1 },
  { id: 9, title: 'Refactor services', status: 'In Progress', assigneeId: 3, deadline: '2025-08-18', projectId: 2 },
  { id: 10, title: 'Feedback meeting', status: 'Completed', assigneeId: 1, deadline: '2025-08-20', projectId: 1 },
];
