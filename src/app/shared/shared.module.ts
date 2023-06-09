
import { NgModule } from "@angular/core";
import { ComponentsModule } from "./components/components.module";

@NgModule({
    exports: [
        ComponentsModule
    ],
})
export class SharedModule { }
