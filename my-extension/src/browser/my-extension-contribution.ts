import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MessageService } from '@theia/core/lib/common';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { MyExtensionWidget } from './my-extension-widget';

export const MyExtensionCommand: Command = {
    id: 'MyExtension.command',
    label: 'Say Hello'
};

@injectable()
export class MyExtensionCommandContribution implements CommandContribution {
    
    @inject(MessageService)
    protected readonly messageService!: MessageService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(MyExtensionCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

const toggleCommand: Command = {
    id: 'MyExtension:toggle-view',
};

@injectable()
export class MyExtensionViewContribution extends AbstractViewContribution<MyExtensionWidget> {

    constructor() {
        super({
            widgetId: MyExtensionWidget.ID,
            widgetName: MyExtensionWidget.LABEL,
            defaultWidgetOptions: { area: 'main' },
            toggleCommandId: toggleCommand.id
        });
    }

}