import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  email = '';
  password = '';
  stayLogged : boolean = false;
  ErrorEmail: string = "";
  ErrorPassword : string = "";

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  VerifyErrorEmail() : number{
    let nbError : number = 0;
    const emailRegex: RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if(this.email.length == 0){
      this.ErrorEmail = "Vous devez renseigner une email";
      nbError++;
    }
    else if(!emailRegex.test(this.email)){
      this.ErrorEmail = "Email invalide";
      nbError++;
    }
    return nbError;
  }

  VerifyErrorPassword() : number{
    let nbError : number = 0;

    if(this.password.length == 0){
      this.ErrorPassword = "Vous devez renseigner un mot de passe";
      nbError++;
    }

    return nbError;
  }


  onSubmit(event: Event){
    event.preventDefault();

    this.ErrorEmail = "";
    this.ErrorPassword = "";

    let nbError : number = 0;
    nbError += this.VerifyErrorEmail();
    nbError += this.VerifyErrorPassword();

    if(nbError > 0)return;

    this.authService.login(this.email, this.password,this.stayLogged)
    .subscribe(
      response => {
        console.log('Connexion réussie', response);
        // this.router.navigate(['*']);
      },
      error => {
        console.error('Erreur lors de la connexion', error);
        // this.notificationService.showNotification('Erreur lors de la connexion !');
        // this.VerifyErrorBackend(error);
      }
    );
  }

}
