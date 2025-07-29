import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    // Mock tasks
    private _tasks = signal<Task[]>([
        { id: 1, title: 'Fix login bug', status: 'Open', assigneeId: 1, deadline: '2025-08-02', projectName: 'Alpha' },
        { id: 2, title: 'Design dashboard', status: 'In Progress', assigneeId: 2, deadline: '2025-08-04', projectName: 'Angular' },
        { id: 3, title: 'Deploy v2.0', status: 'Done', assigneeId: 1, deadline: '2025-08-06', projectName: 'React' },
        { id: 4, title: 'Create onboarding doc', status: 'Open', assigneeId: 1, deadline: '2025-08-08', projectName: 'PHP' },
        { id: 5, title: 'Update tests', status: 'In Progress', assigneeId: 2, deadline: '2025-08-10', projectName: 'Laravel' },
        { id: 6, title: 'Sprint planning', status: 'Open', assigneeId: 3, deadline: '2025-08-12', projectName: 'Android' },
        { id: 7, title: 'Review code', status: 'Done', assigneeId: 1, deadline: '2025-08-14', projectName: 'Python' },
        { id: 8, title: 'Database migration', status: 'Open', assigneeId: 2, deadline: '2025-08-16', projectName: 'C#' },
        { id: 9, title: 'Refactor services', status: 'In Progress', assigneeId: 3, deadline: '2025-08-18', projectName: 'Vue' },
        { id: 10, title: 'Feedback meeting', status: 'Done', assigneeId: 1, deadline: '2025-08-20', projectName: 'Next' },
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
