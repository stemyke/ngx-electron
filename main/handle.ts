import {ipcMain} from "electron";
import {FunctionKeys, FunctionProperty, IpcFunctions, ReturnType} from "@stemy/ngx-electron/types";

export class IpcHandler<T extends {} = IpcFunctions> {

    protected static handlers: {[handler: string]: Function} = null;

    constructor() {
        if (!IpcHandler.handlers) {
            IpcHandler.handlers = {};
            ipcMain.handle("handle-electron-method", (_, method: string, params: any[]) => {
                const handler = IpcHandler.handlers[`method:${method}`];
                if (!handler) {
                    throw new Error(`Handler for method: '${method}' does not exist! Please use IpcHandler.handle() to create one.`);
                }
                return handler(...params);
            });
        }
    }

    handle<K extends FunctionKeys<T>, P extends FunctionProperty<T, K>>(method: K, cb: (...args: Parameters<P>) => ReturnType<P>) {
        const handler = `method:${method as string}`;
        IpcHandler.handlers[handler] = cb;
    }
}
