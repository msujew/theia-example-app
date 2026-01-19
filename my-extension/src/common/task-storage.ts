export interface Task {
    taskName: string;
    assigned?: string;
}

export const TaskStoragePath = '/my-extension/tasks';

export const TaskStorage = Symbol('TaskStorage');

export interface TaskStorage {
    getTasks(): Promise<Task[]>;
    addTask(task: Task): Promise<void>;
}
