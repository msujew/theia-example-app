import { ContainerModule } from "@theia/core/shared/inversify";
import { BackendApplicationContribution } from "@theia/core/lib/node";
import { ConnectionHandler, MaybePromise, RpcConnectionHandler } from "@theia/core";
import { Application } from "express";
import { TaskStorage, TaskStoragePath } from "../common/task-storage";
import { TaskStorageImpl } from "./task-storage-impl";

export default new ContainerModule((bind, _, __, rebind) => {
    // add your backend bindings here
    bind(BackendApplicationContribution).to(MyExtensionBackendContribution);
    bind(TaskStorage).to(TaskStorageImpl).inSingletonScope();
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler<TaskStorage>(TaskStoragePath, () => {
            return ctx.container.get<TaskStorage>(TaskStorage);
        })
    );
});

class MyExtensionBackendContribution implements BackendApplicationContribution {
    configure(app: Application): MaybePromise<void> {
        app.get('/my-extension/hello', (req, res) => {
            res.send('Hello from My Extension Backend!');
        });
    }
}