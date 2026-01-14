import { ContainerModule } from "@theia/core/shared/inversify";
import { BackendApplicationContribution } from "@theia/core/lib/node";
import { MaybePromise } from "@theia/core";
import { Application } from "express";

export default new ContainerModule((bind, _, __, rebind) => {
    // add your backend bindings here
    bind(BackendApplicationContribution).to(MyExtensionBackendContribution);
});

class MyExtensionBackendContribution implements BackendApplicationContribution {
    configure(app: Application): MaybePromise<void> {
        app.get('/my-extension/hello', (req, res) => {
            res.send('Hello from My Extension Backend!');
        });
    }
}