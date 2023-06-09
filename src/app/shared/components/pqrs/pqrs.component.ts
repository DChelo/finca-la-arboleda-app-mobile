import { Component, EventEmitter, Input, Output, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Booking } from 'src/app/interface/ibooking';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css'],
})
export class PqrsComponent {
  @Input() isOpenModal!: boolean;
  @Input() booking!: Booking;
  @Output() onWillDismiss = new EventEmitter<void>();

  form = this._fb.group({
    fileName: ['', [Validators.required]],
    file: [null, Validators.required],
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly alertController: AlertController,
    private readonly service: UploadFileService
  ) {}

  async submit() {
    if (this.form.invalid) return;

    const file: File = this.form.get('file')!.value!;
    const blob = await this.getSourceFileBlob(file);

    const formData = new FormData();

    formData.append('name', file.name);
    formData.append('upload_file', blob);
    formData.append('type', blob.type);
    formData.append('size', blob.size.toString());

    console.log('formData', formData.get('name'));
    console.log('formData', formData.get('file'));

    //call api to send formData
    this.service.sendFile(formData, this.booking.booking_id).subscribe({
      next: async (response) => {
        console.log('response', response);

        response.success ? await this.alertSuccess() : await this.alertError();
      },
      error: (err) => {
        console.log('error api', err);
      },
    });
  }

  getSourceFileB64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result!);
      reader.onerror = (error) => reject(error);
    });
  }

  async getSourceFileBlob(file: File) {
    return new Blob([new Uint8Array(await file.arrayBuffer())], {
      type: file.type,
    });
  }

  async changeFile(event: Event) {
    if (event.target) {
      const file: File = (event.target as HTMLInputElement).files![0];
      const base64 = await this.getSourceFileB64(file);
      const blob = await this.getSourceFileBlob(file);

      this.form.get('file')?.setValue(file as any);

      console.log('file', file);
      console.log('base64', base64);
      console.log('blob', blob);
    } else {
      alert('Nothing');
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

  async alertSuccess() {
    const alert = await this.alertController.create({
      header: 'Enviado!',
      subHeader: 'Pqrs generada con exito!',
      message: '#122112 del radicado',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
