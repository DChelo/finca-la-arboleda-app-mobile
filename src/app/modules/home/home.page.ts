import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reservationCode: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {

  }

  async navigateToReservation() {
    if (this.reservationCode && this.reservationCode.trim() !== '') {
      this.router.navigate(['/reservation'], {
        queryParams: { code: this.reservationCode },
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, ingrese un código de reserva',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
    }
  }
}



