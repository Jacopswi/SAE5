import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(private navCtrl: NavController, private menu: MenuController) {}

  toggleMenu() {
    this.menu.toggle('mobile-menu');
  }


}
