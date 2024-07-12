import {ElectronService} from "./services/electron.service";

// --- Pipes ---
export const pipes = [];

// --- Directives ---
export const directives = [];

// --- Components ---
export const components = [];

export const providers = [
    ...pipes,
    ElectronService,

];
