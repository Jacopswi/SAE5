import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  username  : string = '';
  email : string = '';
  password  : string = '';
  passwordAgain  : string = '';



  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  async signUp() {
      try {
        await this.authService.signUp(this.email, this.password, this.username);
        console.log("signUp success")
        this.router.navigate(['/tabs/login']);
      } catch (error) {
        console.error('Erreur de signUp:', error);
      }
    }

}
