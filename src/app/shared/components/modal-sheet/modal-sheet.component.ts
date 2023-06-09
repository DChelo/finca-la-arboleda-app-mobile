import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-modal-sheet',
    templateUrl: './modal-sheet.component.html'
})
export class ModalSheetComponent {
    @Input() isOpen!: boolean;
    @Input() initialBreakpoint = 0.5;
    @Output() onWillDismiss = new EventEmitter<void>()
}
