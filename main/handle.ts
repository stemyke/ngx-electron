import {ipcMain} from "electron";
import {FunctionKeys, FunctionProperty, IpcFunctions, ReturnType} from "@stemy/ngx-electron/types";

export class IpcHandler<T extends {} = IpcFunctions> {
    handle<K extends FunctionKeys<T>, P extends FunctionProperty<T, K>>
    (channel: K, handler: (...args: Parameters<P>) => ReturnType<P>) {
        ipcMain.handle(channel as string, (event, args) => handler(...args));
    }
}
