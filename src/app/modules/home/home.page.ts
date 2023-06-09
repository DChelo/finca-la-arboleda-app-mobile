import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  reservationCode: string = '';

  constructor(private router: Router) {}

  // goToReservation(){
  //   this.router.navigate(['/reservation'])
  // }

  navigateToReservation() {
    this.router.navigate(['/reservation'], {
      queryParams: { code: this.reservationCode }
    });
  }
  
}
  
  

