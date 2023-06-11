import { NgModule } from "@angular/core";
import { CardReservationComponent } from "./card/card-reservation/card-reservation.component";
import { CoreModule } from "../core.module";
import { RatesComponent } from "./rates/rates.component";
import { ModalSheetComponent } from "./modal-sheet/modal-sheet.component";
import { ButtonComponent } from "./button/button.component";
import { PqrsComponent } from './pqrs/pqrs.component';

const components = [CardReservationComponent, RatesComponent, ModalSheetComponent, ButtonComponent, PqrsComponent];

@NgModule({
    imports: [CoreModule],
    declarations: [...components],
    exports: [...components],
})
export class ComponentsModule { }
