import {Injectable} from "@angular/core";
import {FunctionKeys, FunctionProperty, IpcFunctions, OnlyFunctions} from "@stemy/ngx-electron/types";
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

    async invoke<K extends FunctionKeys<T>, P extends FunctionProperty<T, K>>(method: K, ...args: Parameters<P>): Promise<ReturnType<P>> {
        if (!this.ipcRenderer) {
            throw new Error("ipcRenderer is not available!");
        }
        const channel = `method:${method as string}`;
        const exists = await this.ipcRenderer.invoke("handler-exists", channel);
        if (!exists) {
            throw new Error(`Handler for '${channel}' does not exist! Please use IpcHandler.handle() to create one.`);
        }
        return this.ipcRenderer.invoke(channel, ...args);
    }
}
