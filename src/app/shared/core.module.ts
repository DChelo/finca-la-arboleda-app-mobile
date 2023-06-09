

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

const dependencies = [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
];

@NgModule({
    imports: [...dependencies],
    exports: [...dependencies]
})
export class CoreModule { }
