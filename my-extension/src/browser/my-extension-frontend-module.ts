/**
 * Generated using theia-extension-generator
 */
import { MyExtensionCommandContribution } from './my-extension-contribution';
import { CommandContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(MyExtensionCommandContribution);
});
