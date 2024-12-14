// camera.component.ts
import { Component, OnInit } from '@angular/core';
// import * as tf from '@tensorflow/tfjs';
// import * as mobilenet from '@tensorflow-models/mobilenet';

import { DetectionAnimalIaService } from 'src/app/services/detection-animal-ia.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {

  result: any; // Variable pour stocker les résultats de l'API

  constructor(private detectionService: DetectionAnimalIaService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.detectionService.detect(file).subscribe(
        (response) => {
          console.log('Résultat de détection :', response);
          this.result = response; // Stocker le résultat pour l'afficher
        },
        (error) => {
          console.error('Erreur lors de l’appel API :', error);
        }
      );
    }
  }


  // photo: string | null = null;
  // model: any; // Pour stocker le modèle MobileNet
  // animalType: string | null = null; // Pour stocker le type d'animal

  // private animalClasses: { [key: string]: string } = {
  //   dog: 'Chien',
  //   cat: 'Chat',
  //   horse: 'Cheval',
  //   cow: 'Vache',
  //   sheep: 'Mouton',
  //   // Ajoutez d'autres animaux si nécessaire
  // };

  // constructor() { }

  // ngOnInit() {
  //   this.loadModel(); // Charger le modèle lors de l'initialisation
  // }

  // async loadModel() {
  //   this.model = await mobilenet.load(); // Charger MobileNet
  //   console.log("Model loaded");
  // }

  // async classifyImage(imageSrc: string) {
  //   const img = new Image();
  //   img.src = imageSrc;

  //   img.onload = async () => {
  //     const tensorImg = tf.browser.fromPixels(img);
  //     const resizedImg = tf.image.resizeBilinear(tensorImg, [224, 224]); // Redimensionner l'image
  //     const batchedImg = resizedImg.expandDims(0); // Ajouter une dimension pour le batch
  //     const predictions = await this.model.classify(batchedImg); // Classifier l'image

  //     // Récupérer le type d'animal à partir des prédictions
  //     this.animalType = predictions[0]?.className || 'Inconnu'; // Prendre le premier résultat ou 'Inconnu'
  //     console.log(`Animal reconnu : ${this.animalType}`);
  //   };
  // }

  // openCamera() {
  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.accept = 'image/*';
  //   input.capture = 'camera';

  //   input.onchange = (event: any) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       this.photo = reader.result as string;
  //       this.classifyImage(this.photo); // Classifier l'image après qu'elle ait été prise
  //     };

  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   input.click();
  // }

  // openGallery() {
  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.accept = 'image/*';

  //   input.onchange = (event: any) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       this.photo = reader.result as string;
  //       this.classifyImage(this.photo); // Classifier l'image après qu'elle ait été choisie
  //     };

  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   input.click();
  // }
}
