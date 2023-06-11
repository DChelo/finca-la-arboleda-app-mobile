import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabinsService } from '../../services/cabins.service';
import { Booking } from '../../interface/ibooking';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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
    private datePipe: DatePipe
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

  goToPqrs(){
    console.log('on tap callSupport');
    this.isOpenModalPqrs = true;
  }

  callSupport(){
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
        console.log(err);
        this.router.navigate(['/home']);
      },
    });
  }
}

