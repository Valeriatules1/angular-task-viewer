export interface Task {
  id: number;
  title: string;
  status: 'Open' | 'In Progress' | 'Completed';
  assigneeId: number;
  deadline: string; // ISO date
  projectId: number;
}
