import * as React from "react";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
import { ApplicationShell, ExtractableWidget, WidgetManager } from "@theia/core/lib/browser";
import { Emitter, Event } from "@theia/core";

const TASKS: Task[] = [
    { taskName: 'Title Transfer', assigned: 'Alice' },
    { taskName: 'Release Charge' },
    { taskName: 'Transfer Title', assigned: 'Bob' },
    { taskName: 'Write Unit Tests' }
];

@injectable()
export class TaskInfoService {

    private newTaskEventEmitter = new Emitter<void>();
    get onNewTask(): Event<void> {
        return this.newTaskEventEmitter.event;
    }

    fireNewTask(): void {
        this.newTaskEventEmitter.fire();
    }

}

@injectable()
export class MyExtensionWidget extends ReactWidget implements ExtractableWidget {
    isExtractable = true;
    secondaryWindow: Window | undefined;
    previousArea?: ApplicationShell.Area;

    static readonly ID = 'my-extension-widget';
    static readonly LABEL = 'My Extension Widget';

    @inject(WidgetManager)
    protected readonly widgetManager!: WidgetManager;

    @inject(ApplicationShell)
    protected readonly shell!: ApplicationShell;

    @inject(TaskInfoService)
    protected readonly taskInfoService!: TaskInfoService;

    @postConstruct()
    protected init(): void {
        this.id = MyExtensionWidget.ID;
        this.title.label = MyExtensionWidget.LABEL;
        this.title.closable = true;
        this.update();
        this.toDispose.push(
            this.taskInfoService.onNewTask(() => {
                TASKS.push({ taskName: 'New Task' });
                console.log('New task added');
                this.update();
            })
        );
    }

    protected render(): React.ReactNode {
        return <TaskListComponent tasks={TASKS} onEdit={() => this.createTaskInfoWidget()} />;
    }

    private async createTaskInfoWidget(): Promise<void> {
        const widget = await this.widgetManager.getOrCreateWidget<TaskInfoWidget>(TaskInfoWidget.ID);
        await this.shell.addWidget(widget, {
            ref: this,
            mode: 'open-to-right'
        });
    }

}



@injectable()
export class TaskInfoWidget extends ReactWidget {
    static readonly ID = 'task-info-widget';
    static readonly LABEL = 'Task Info Widget';

    @inject(TaskInfoService)
    protected readonly taskInfoService!: TaskInfoService;

    @postConstruct()
    protected init(): void {
        this.id = TaskInfoWidget.ID;
        this.title.label = TaskInfoWidget.LABEL;
        this.title.closable = true;
        this.update();
    }

    protected render(): React.ReactNode {
        return <div>Task Info Details
            <button onClick={() => this.taskInfoService.fireNewTask()}>Add New</button>
        </div>;
    }
}

interface TaskListProps {
    tasks: Task[];
    onEdit: () => void;
}

interface Task {
    taskName: string;
    assigned?: string;
}

function TaskListComponent(props: TaskListProps): React.ReactElement {
    return (
        <table>
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Assigned To</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.tasks.map((task, index) => (
                        <TaskComponent key={index} onEdit={props.onEdit} task={task} />
                    ))
                }
            </tbody>
        </table>
    )
}

function TaskComponent({ task, onEdit }: { task: Task; onEdit: () => void }): React.ReactElement {
    const [assigned, setAssigned] = React.useState(task.assigned);
    return <tr>
        <td>{task.taskName}</td>
        <td>{assigned ?? <TaskAssignButton onAssign={() => { setAssigned('Mark') }} />}</td>
        <td><button onClick={onEdit}>Edit</button></td>
    </tr>
}

function TaskAssignButton(props: { onAssign: () => void }): React.ReactElement {
    return (
        <button onClick={props.onAssign}>Assign Task</button>
    )
}