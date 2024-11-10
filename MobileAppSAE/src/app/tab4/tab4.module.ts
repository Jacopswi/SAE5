import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab4RoutingModule } from './tab4-routing.module';
import { HomeComponent } from './components/home/home.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab4RoutingModule
  ],
  declarations: [HomeComponent]
})
export class Tab4PageModule { }
