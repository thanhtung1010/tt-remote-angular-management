import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ROUTE, SharedModule } from 'tt-library-angular-porfolio';

const routes: Route[] = [
  {
    path: '',
    component: AppComponent,
  }
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [AppComponent],
})
export class AppModule {}
