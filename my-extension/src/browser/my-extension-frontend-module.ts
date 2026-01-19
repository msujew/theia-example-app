/**
 * Generated using theia-extension-generator
 */
import { bindViewContribution, ServiceConnectionProvider, WidgetFactory } from '@theia/core/lib/browser';
import { MyExtensionCommandContribution, MyExtensionViewContribution } from './my-extension-contribution';
import { CommandContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { MyExtensionWidget, TaskInfoService, TaskInfoWidget } from './my-extension-widget';

import '../../src/browser/style/index.css';
import { TaskStorage, TaskStoragePath } from '../common/task-storage';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(MyExtensionCommandContribution);
    bindViewContribution(bind, MyExtensionViewContribution);
    bind(MyExtensionWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: MyExtensionWidget.ID,
        createWidget: () => ctx.container.get<MyExtensionWidget>(MyExtensionWidget)
    })).inSingletonScope();
    bind(TaskInfoWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: TaskInfoWidget.ID,
        createWidget: () => ctx.container.get<TaskInfoWidget>(TaskInfoWidget)
    })).inSingletonScope();
    bind(TaskInfoService).toSelf().inSingletonScope();
    bind(TaskStorage).toDynamicValue(ctx => {
        const connection = ctx.container.get(ServiceConnectionProvider);
        return connection.createProxy<TaskStorage>(TaskStoragePath);
    }).inSingletonScope();
});
