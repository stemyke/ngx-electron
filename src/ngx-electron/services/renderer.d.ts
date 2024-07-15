import type {DesktopCapturer, IpcRenderer, WebFrame, Clipboard, CrashReporter, NativeImage, Shell} from "electron";

export interface ElectronAPI {
    platform: string;
    arch: string;
    desktopCapturer: DesktopCapturer;
    ipcRenderer: IpcRenderer;
    webFrame: WebFrame;
    clipboard: Clipboard;
    crashReporter: CrashReporter;
    nativeImage: NativeImage;
    shell: Shell;
}

declare global {
    interface Window {
        electron: ElectronAPI;
        require: any;
    }
}
