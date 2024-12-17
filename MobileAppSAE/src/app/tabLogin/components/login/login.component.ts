import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  email = '';
  password = '';
  ErrorEmail: string = "";
  ErrorPassword : string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  
  async logout(){
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  }


  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  }

}
