import { Component, OnInit } from '@angular/core';
import { ManagerPageLayoutComponent } from 'tt-library-angular-porfolio';

@Component({
  selector: 'tt-manager-home-page',
  templateUrl: './manager-home-page.component.html',
  standalone: true,
  imports: [
    ManagerPageLayoutComponent,
  ]
})
export class ManagerHomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
