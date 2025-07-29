export interface Task {
    id: number;
    title: string;
    status: 'Open' | 'In Progress' | 'Done';
    assigneeId: number;
    deadline: string; // ISO string
    projectName: string;
}
