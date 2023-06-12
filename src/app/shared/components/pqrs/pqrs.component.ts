import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Booking } from 'src/app/interface/ibooking';
import { Pqrs } from 'src/app/interface/ipqrs';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { getError, validateAllFormFields } from '../../utils/form-validation';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css'],

})
export class PqrsComponent {
  @Input() isOpenModal!: boolean;
  @Input() booking!: Booking;
  @Output() onWillDismiss = new EventEmitter<void>();

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  form: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly alertController: AlertController,
    private readonly service: UploadFileService,
    private modalController: ModalController

  ) {
    this.form = this._fb.group({
      reason: ['', [Validators.required]],
      type: ['', Validators.required],
      file: [null, Validators.required],
      description: ['', Validators.required],
      fileName: ['', Validators.required]
    });

  }

  public submit() {
      this.form.valid
        ? this.save()
        : validateAllFormFields(this.form);
    }
    

  async save() {
    const payload = {
      "bookings_id": this.booking.booking_id,
      "type": this.form.get("type")?.value,
      "reason": this.form.get("reason")?.value,
      "description": this.form.get("description")?.value,
      "name_user": `${this.booking.name} ${this.booking.last_name}`,
      "phone_user": this.booking.phone_number
    };
  
    const file: File = this.form.get('file')!.value!;
  
    const formData = new FormData();
  
    formData.append('name_file', file.name);
    formData.append('upload_file', file);
  
    Object.keys(payload).forEach((k) => {
      formData.append(k, `${payload[k as keyof typeof payload]}`);
      this.modalController.dismiss().then(() => {});
    });
  
    console.log('formData', formData.get('upload_file'));
    console.log('formData', formData.get('bookings_id'));
  
    //call api to send formData
    this.service.sendFile(formData).subscribe({
      next: async (response) => {
        console.log('response', response);
        response.success ? await this.alertSuccess(response) : await this.alertError();
        
        // Reset the form after successful file upload
        this.form.reset();
      },
      error: (err) => {
        console.log('error api', err);
      },
    });
  }
  

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedExtensions = /(\.pdf)$/i;

    if (!allowedExtensions.exec(file.name)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Solo se permiten archivos PDF.',
        buttons: ['OK']
      });

      await alert.present();

      this.form.get('file')?.setValue(null);
      this.form.get('fileName')?.setValue(null);
    } else {
      this.form.get('file')?.setValue(file);
    }
  }


  async alertError() {
    const alert = await this.alertController.create({
      header: 'Alert Error',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertSuccess(pqrs: Pqrs) {
    const alert = await this.alertController.create({
      header: 'Enviado!',
      subHeader: 'Pqrs generada con éxito!',
      message:  `# ${pqrs.tracking} del radicado`,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  public getError = (field: string, aliasError: string) =>
    getError(field, aliasError, this.form);
}
