import * as React from "react";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import { injectable, postConstruct } from "@theia/core/shared/inversify";


@injectable()
export class MyExtensionWidget extends ReactWidget {

    static readonly ID = 'my-extension-widget';
    static readonly LABEL = 'My Extension Widget';

    @postConstruct()
    protected init(): void {
        this.id = MyExtensionWidget.ID;
        this.title.label = MyExtensionWidget.LABEL;
        this.title.closable = true;
        this.update();
    }

    protected render(): React.ReactNode {
        return <div>
            <h1>Hello from My Extension Widget!</h1>
        </div>;
    }

}