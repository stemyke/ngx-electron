import {Injectable} from "@angular/core";
import {ipcRenderer} from "electron";
import {FunctionKeys, FunctionProperty, IpcFunctions, OnlyFunctions} from "@stemy/ngx-electron/types";

@Injectable()
export class ElectronService<T extends OnlyFunctions<{}> = IpcFunctions> {

    get isElectronApp(): boolean {
        return !!window.navigator.userAgent.match(/Electron/);
    }

    get isMacOS(): boolean {
        return this.isElectronApp && process.platform === "darwin";
    }

    get isWindows(): boolean {
        return this.isElectronApp && process.platform === "win32";
    }

    get isLinux(): boolean {
        return this.isElectronApp && process.platform === "linux";
    }

    get isX86(): boolean {
        return this.isElectronApp && process.arch === "ia32";
    }

    get isX64(): boolean {
        return this.isElectronApp && process.arch === "x64";
    }

    get isArm(): boolean {
        return this.isElectronApp && process.arch === "arm";
    }

    invoke<K extends FunctionKeys<T>, P extends FunctionProperty<T, K>>(channel: K, ...args: Parameters<P>): Promise<ReturnType<P>> {
        return ipcRenderer.invoke(channel as string, ...args);
    }
}
