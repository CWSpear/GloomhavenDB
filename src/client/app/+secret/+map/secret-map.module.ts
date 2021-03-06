import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SecretMapComponent } from './secret-map.component';

const routes: Routes = [
  {
    path: '',
    component: SecretMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretMapRoutingModule {}

@NgModule({
  imports: [CommonModule, RouterModule, SecretMapRoutingModule, FontAwesomeModule],
  declarations: [SecretMapComponent],
})
export class SecretMapModule {}
