import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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



  constructor(private authService: AuthService) { }

  onSubmit(event: Event){
    event.preventDefault();

    // faire la verif des 2 mots de passes identiques + erreurs

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData)
    .subscribe(
      response => {
        console.log('auth réussie', response);
        // redirect vers login
      },
      error => {
        console.error('Erreur lors de la connexion', error);
      }
    );
  }


  ngOnInit() {}

}
