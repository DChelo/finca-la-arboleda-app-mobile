import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabinsService } from '../../services/cabins.service';
import { Booking } from '../../interface/ibooking';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  reservationCode: string;
  public booking!: Booking;
  public formattedInitialDate!: string;
  public formattedFinalDate!: string;
  isOpenModalPqrs = false;
  respuestasVisibles: boolean[] = [];

  constructor(
    private router: Router,
    private service: CabinsService,
    private navParams: NavParams,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private toastController: ToastController
  ) {
    this.reservationCode = this.navParams.get('code');
  }

  preguntas: any[] = [
    { mostrarRespuesta: false }, // Pregunta 0
    { mostrarRespuesta: false }, // Pregunta 1
    { mostrarRespuesta: false }, // Pregunta 2
    { mostrarRespuesta: false }, // Pregunta 3
    { mostrarRespuesta: false }, // Pregunta 4
    // Agrega más objetos si tienes más preguntas
  ];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.reservationCode = params['code'];
      this.getBookingByCode();
    });
  }

  backToHome() {
    this.router.navigate(['/home']);
  }

  goToPqrs() {
    console.log('on tap goToPqrs');
    this.isOpenModalPqrs = true;
  }

  callSupport() {
    console.log('on tap callSupport');
    this.isOpenModalPqrs = true;
  }

  getBookingByCode() {
    this.service.getBookingByCode(this.reservationCode).subscribe({
      next: (response) => {
        console.log(response);
        this.booking = response;

        // Dar formato a las fechas
        this.formattedInitialDate = this.datePipe.transform(
          this.booking.initial_date,
          'dd/MM/yyyy'
        )!;
        this.formattedFinalDate = this.datePipe.transform(
          this.booking.final_date,
          'dd/MM/yyyy'
        )!;
      },
      error: (err) => {
        console.log("Codigo no existe");
        this.presentToast('El código de reserva no existe');
        this.router.navigate(['/home']);
      },
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  mostrarRespuesta(id: number) {
    this.respuestasVisibles[id] = !this.respuestasVisibles[id];
  }
}
