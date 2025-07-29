import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    // Mock tasks
    private _tasks = signal<Task[]>([
        { id: 1, title: 'Setup project', status: 'Open', assigneeId: 1, deadline: '2025-08-15', projectName: 'Alpha' },
        { id: 2, title: 'Fix bug #123', status: 'In Progress', assigneeId: 2, deadline: '2025-08-10', projectName: 'Beta' },
        { id: 3, title: 'Fix bug #123', status: 'In Progress', assigneeId: 3, deadline: '2025-08-10', projectName: 'Beta' },
        { id: 4, title: 'Fix bug #123', status: 'In Progress', assigneeId: 4, deadline: '2025-08-10', projectName: 'Beta' },
        { id: 5, title: 'Fix bug #123', status: 'In Progress', assigneeId: 5, deadline: '2025-08-10', projectName: 'Beta' },
        { id: 6, title: 'Fix bug #123', status: 'In Progress', assigneeId: 6, deadline: '2025-08-10', projectName: 'Beta' },
        { id: 7, title: 'Fix bug #123', status: 'In Progress', assigneeId: 7, deadline: '2025-08-10', projectName: 'Beta' },
        // Add more mock tasks here

        /*{ id: 1, title: 'Fix login bug', status: 'Open', assigneeId: 1, deadline: '2025-08-02', projectId: 1 },
        { id: 2, title: 'Design dashboard', status: 'In Progress', assigneeId: 2, deadline: '2025-08-04', projectId: 1 },
        { id: 3, title: 'Deploy v2.0', status: 'Completed', assigneeId: 1, deadline: '2025-08-06', projectId: 2 },
        { id: 4, title: 'Create onboarding doc', status: 'Open', assigneeId: 1, deadline: '2025-08-08', projectId: 1 },
        { id: 5, title: 'Update tests', status: 'In Progress', assigneeId: 2, deadline: '2025-08-10', projectId: 2 },
        { id: 6, title: 'Sprint planning', status: 'Open', assigneeId: 3, deadline: '2025-08-12', projectId: 2 },
        { id: 7, title: 'Review code', status: 'Completed', assigneeId: 1, deadline: '2025-08-14', projectId: 1 },
        { id: 8, title: 'Database migration', status: 'Open', assigneeId: 2, deadline: '2025-08-16', projectId: 1 },
        { id: 9, title: 'Refactor services', status: 'In Progress', assigneeId: 3, deadline: '2025-08-18', projectId: 2 },
        { id: 10, title: 'Feedback meeting', status: 'Completed', assigneeId: 1, deadline: '2025-08-20', projectId: 1 },*/
    ]);
    tasks = this._tasks.asReadonly();

    // Filters as signals
    filterProject = signal<string | null>(null);
    filterStatus = signal<string | null>(null);
    filterAssignee = signal<number | null>(null);

    // Computed filtered tasks
    filteredTasks = computed(() => {
        return this._tasks().filter(task => {
            const passProject = this.filterProject() ? task.projectName === this.filterProject() : true;
            const passStatus = this.filterStatus() ? task.status === this.filterStatus() : true;
            const passAssignee = this.filterAssignee() ? task.assigneeId === this.filterAssignee() : true;
            return passProject && passStatus && passAssignee;
        });
    });

    // CRUD stubs
    deleteTask(id: number) {
        this._tasks.update(tasks => tasks.filter(t => t.id !== id));
    }

    editTask(updated: Task) {
        this._tasks.update(tasks => tasks.map(t => t.id === updated.id ? updated : t));
    }

    // ...Add more methods as needed
}
