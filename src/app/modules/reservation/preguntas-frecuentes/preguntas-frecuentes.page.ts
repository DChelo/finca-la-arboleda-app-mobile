import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.page.html',
  styleUrls: ['./preguntas-frecuentes.page.scss'],
})
export class PreguntasFrecuentesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  preguntas: any[] = [

    {
      pregunta: '¿Cuáles son las instalaciones y servicios que se ofrecen en la cabaña?',
      respuesta: 'La cabaña cuenta con todas las instalaciones interiores de esta y exteriores cuenta con piscina , cancha, zonas verdes y zonas comunes , tambien cuenta con la zona de juegos y zona de asados.',
    },
    {
      pregunta: '¿Hay restricciones en cuanto al número de personas que pueden alojarse en la cabaña?      ',
      respuesta: 'El limite de personas varia segun el hospedaje que selecciones en la pestaña donde realices tu reserva',
    },
    {
      pregunta: '¿Hay algún costo adicional por el uso de las instalaciones o servicios adicionales?',
      respuesta: 'Sobre los costos ya se manejan segun el plan que seleccionaste en tu reserva.',
    },
    {
      pregunta: '¿Cuál es el diseño de la cabaña y cuántos dormitorios tiene?',
      respuesta: 'El diseño que maneja la cabaña es moderna asimilando la forma de un pequeño aparta estudio con 2 dormitorios ',
    },
    {
      pregunta: '¿Puedo llevar a mis mascotas conmigo a la cabaña?',
      respuesta: 'Si, siempre y cuando seas cauteloso y te hagas completamente responsable de ella.',
    },
  ];

  respuestaVisible = false;
  preguntaSeleccionada: any;

  mostrarRespuesta(pregunta: any) {
    this.respuestaVisible = true;
    this.preguntaSeleccionada = pregunta;
  }

  
}