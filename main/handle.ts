import {ipcMain} from "electron";
import {FunctionKeys, FunctionProperty, IpcFunctions, ReturnType} from "@stemy/ngx-electron/types";

export class IpcHandler<T extends {} = IpcFunctions> {

    protected static exists: {[handler: string]: boolean} = null;

    constructor() {
        if (!IpcHandler.exists) {
            IpcHandler.exists = {};
            ipcMain.handle("handler-exists", (event, method: string) => {
                const channel = `method:${method}`;
                return IpcHandler.exists[channel] || false;
            });
        }
    }

    handle<K extends FunctionKeys<T>, P extends FunctionProperty<T, K>>
    (method: K, handler: (...args: Parameters<P>) => ReturnType<P>) {
        const channel = `method:${method as string}`;
        IpcHandler.exists[channel] = true;
        ipcMain.handle(channel, (event, ...args: Parameters<P>) => handler(...args));
    }
}
