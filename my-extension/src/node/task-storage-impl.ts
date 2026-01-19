import { injectable } from "@theia/core/shared/inversify";
import { Task, TaskStorage } from "../common/task-storage";
import { generateUuid } from "@theia/core";

@injectable()
export class TaskStorageImpl implements TaskStorage {

    private tasks: Task[] = [
        { id: generateUuid(), taskName: 'Title Transfer', assigned: 'Alice' },
        { id: generateUuid(), taskName: 'Release Charge' },
        { id: generateUuid(), taskName: 'Transfer Title', assigned: 'Bob' },
        { id: generateUuid(), taskName: 'Write Unit Tests' }
    ];

    async getTasks(): Promise<Task[]> {
        return this.tasks;
    }

    async addTask(task: Task): Promise<void> {
        this.tasks.push(task);
    }

}