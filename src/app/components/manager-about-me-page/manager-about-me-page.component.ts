import { Component, OnInit } from '@angular/core';
import { ManagerPageLayoutComponent } from 'tt-library-angular-porfolio';

@Component({
  selector: 'tt-manager-about-me-page',
  templateUrl: './manager-about-me-page.component.html',
  standalone: true,
  imports: [
    ManagerPageLayoutComponent,
  ]
})
export class ManagerAboutMePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
