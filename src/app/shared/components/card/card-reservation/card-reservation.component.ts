import { Component, Input } from "@angular/core";
import { Booking } from "src/app/interface/ibooking";


@Component({
  selector: 'app-card-reservation',
  templateUrl: './card-reservation.component.html',
  styleUrls: ['./card-reservation.component.scss'],
})
export class CardReservationComponent {

  selectedRating!: number;
  @Input() booking!: Booking;
  @Input() formattedInitialDate!: string | null;
  @Input() formattedFinalDate!: string | null;

  submitRating() {
    console.log('Calificación seleccionada:', this.selectedRating);
    // Aquí puedes realizar más acciones con la calificación seleccionada, como enviarla al servidor, etc.
  }

  public isOpenModal = false;

  public onTapRate(rating: { rate: number }) {
    console.log('rate', rating);
    this.selectedRating = rating.rate;
    this.isOpenModal = true;
  }

  loadImg(imgUrl : string){
    const url = 'https://fincaturisticalaarboleda.com/storage/imgServices/';
    return url + imgUrl;
}
}