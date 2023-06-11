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
    console.log('on tap callSupport');
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
  
  preguntas: any[] = [

    {
      pregunta: '¿Cuáles son las instalaciones y servicios que se ofrecen en la cabaña?',
      respuesta: 'La cabaña cuenta con todas las instalaciones interiores de esta y exteriores cuenta con piscina , cancha, zonas verdes y zonas comunes , tambien cuenta con la zona de juegos y zona de asados.',
    },
    {
      pregunta: '¿Hay restricciones en cuanto al número de personas que pueden alojarse en la cabaña?',
      respuesta: 'El limite de personas varia segun el hospedaje que selecciones en la pestaña donde realices tu reserva',
    },
    {
      pregunta: '¿Hay algún costo adicional por el uso de las instalaciones o servicios adicionales?',
      respuesta: 'Sobre los costos ya se manejan segun el plan que seleccionaste en tu reserva.',
    },
    {
      pregunta: '¿Cuál es el diseño de la cabaña y cuántos dormitorios tiene?',
      respuesta: 'El diseño que maneja la cabaña es moderna asimilando la forma de un pequeño aparta estudio con 2 dormitorios ',
    },
    {
      pregunta: '¿Puedo llevar a mis mascotas conmigo a la cabaña?',
      respuesta: 'Si, siempre y cuando seas cauteloso y te hagas completamente responsable de ella.',
    },
  ];

  respuestaVisible = false;
  preguntaSeleccionada: any;

  mostrarRespuesta(pregunta: any) {
    this.respuestaVisible = true;
    this.preguntaSeleccionada = pregunta;
  }
}




