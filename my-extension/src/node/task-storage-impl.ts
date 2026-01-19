import { injectable } from "@theia/core/shared/inversify";
import { Task, TaskStorage } from "../common/task-storage";

@injectable()
export class TaskStorageImpl implements TaskStorage {

    private tasks: Task[] = [
        { taskName: 'Title Transfer', assigned: 'Alice' },
        { taskName: 'Release Charge' },
        { taskName: 'Transfer Title', assigned: 'Bob' },
        { taskName: 'Write Unit Tests' }
    ];

    async getTasks(): Promise<Task[]> {
        return this.tasks;
    }

    async addTask(task: Task): Promise<void> {
        this.tasks.push(task);
    }

}