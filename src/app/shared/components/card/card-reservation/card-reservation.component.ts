import { Component, Input } from "@angular/core";
import { Booking } from "src/app/interface/ibooking";
import { environment }  from "src/environments/environment";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-card-reservation',
  templateUrl: './card-reservation.component.html',
  styleUrls: ['./card-reservation.component.scss'],
})
export class CardReservationComponent {
  


  @Input() booking!: Booking;
  @Input() formattedInitialDate!: string | null;
  @Input() formattedFinalDate!: string | null;
 
  selectedRating!: number;
  public opinion: string = '';
  public isOpenModal = false;
  


 constructor(private http: HttpClient) { }
  submitRating() {
     const payload = {
      bookings_id: this.booking.booking_id,
      score: this.selectedRating,
      description: this.opinion
  };

  this.http.post(environment.API + '/bookings/califications', payload)
  .subscribe((response: any) => {
    // Manejar la respuesta de la API, si es necesario
    console.log('Calificación enviada exitosamente', response);
    // Restablecer los valores

    this.selectedRating = 0;
    this.opinion = '';
    this.isOpenModal = false;
  } ,(error: any) => {
    // Manejar cualquier error de la API, si es necesario
    console.error('Error al enviar la calificación', error);
  });
}

  public onTapRate(rating: { rate: number }) {
    console.log('rate', rating);
    this.selectedRating = rating.rate;
    this.isOpenModal=true;
  }

  loadImg(imgUrl : string){
    const url = 'https://fincaturisticalaarboleda.com/storage/imgServices/';
    return url + imgUrl;
}
}