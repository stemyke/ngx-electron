import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {components, directives, pipes, providers} from "./ngx-electron.imports";

@NgModule({
    declarations: [
        ...pipes,
        ...directives,
        ...components
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ...pipes,
        ...directives,
        ...components
    ],
    providers: pipes
})
export class NgxElectronModule {

    static forRoot(): ModuleWithProviders<NgxElectronModule> {
        return {
            ngModule: NgxElectronModule,
            providers: [
                ...providers,
            ]
        };
    }
}
