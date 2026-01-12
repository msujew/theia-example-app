import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MessageService } from '@theia/core/lib/common';

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
