import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetectionAnimalIaService {
  private apiUrl = 'http://localhost:5000/detect';

   constructor(private http: HttpClient) {}

   detect(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(this.apiUrl, formData);
  }
}
