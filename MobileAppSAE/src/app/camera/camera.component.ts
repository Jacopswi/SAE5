// camera.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  photo: string | null = null;

  constructor() { }

  openCamera() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.photo = reader.result as string;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  openGallery() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.photo = reader.result as string;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }
}
