/**
 * Generated using theia-extension-generator
 */
import { bindViewContribution, WidgetFactory } from '@theia/core/lib/browser';
import { MyExtensionCommandContribution, MyExtensionViewContribution } from './my-extension-contribution';
import { CommandContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { MyExtensionWidget } from './my-extension-widget';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(MyExtensionCommandContribution);
    bindViewContribution(bind, MyExtensionViewContribution);
    bind(MyExtensionWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: MyExtensionWidget.ID,
        createWidget: () => ctx.container.get<MyExtensionWidget>(MyExtensionWidget)
    })).inSingletonScope();
});
