import {Injectable} from "@angular/core";
import {
    FunctionKeys,
    FunctionProperty,
    IpcFunctions,
    OnlyFunctions,
    PromisedType
} from "@stemy/ngx-electron/types";
import {ElectronAPI} from "./renderer";

@Injectable()
export class ElectronService<T extends OnlyFunctions<{}> = IpcFunctions> {

    private readonly electron: ElectronAPI;

    get isElectronApp(): boolean {
        return !!this.electron;
    }

    get isMacOS(): boolean {
        return this.electron?.platform === "darwin";
    }

    get isWindows(): boolean {
        return this.electron?.platform === "win32";
    }

    get isLinux(): boolean {
        return this.electron?.platform === "linux";
    }

    get isX86(): boolean {
        return this.electron?.arch === "ia32";
    }

    get isX64(): boolean {
        return this.electron?.arch === "x64";
    }

    get isArm(): boolean {
        return this.electron?.arch === "arm";
    }

    get desktopCapturer() {
        return this.electron?.desktopCapturer;
    }

    get ipcRenderer() {
        return this.electron?.ipcRenderer;
    }

    get webFrame() {
        return this.electron?.webFrame;
    }

    get clipboard() {
        return this.electron?.clipboard;
    }

    get crashReporter() {
        return this.electron?.crashReporter;
    }

    get nativeImage() {
        return this.electron?.nativeImage;
    }

    get shell() {
        return this.electron?.shell;
    }

    constructor() {
        this.electron = window.electron || window.require?.("electron");
    }

    invoke<K extends FunctionKeys<T>, P extends FunctionProperty<T, K>>(method: K, ...args: Parameters<P>): PromisedType<ReturnType<P>> {
        if (!this.ipcRenderer) {
            throw new Error("ipcRenderer is not available!");
        }
        return this.ipcRenderer.invoke("handle-electron-method", method, args) as any;
    }
}
