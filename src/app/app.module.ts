import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ROUTE, SharedModule } from 'tt-library-angular-porfolio';
import { AppComponent } from "./app.component";

const routes: Route[] = [
  {
    path: ROUTE.CMS_MAIN,
    loadComponent: () => import('./components/home/home.component')
      .then(c => c.HomeComponent),
  },
  {
    path: ROUTE.CMS_MANAGEMENT_HOME_PAGE,
    loadComponent: () => import('./components/manager-home-page/manager-home-page.component')
      .then(c => c.ManagerHomePageComponent),
  },
  {
    path: ROUTE.CMS_MANAGEMENT_ABOUT_ME_PAGE,
    loadComponent: () => import('./components/manager-about-me-page/manager-about-me-page.component')
      .then(c => c.ManagerAboutMePageComponent),
  },
  {
    path: ROUTE.CMS_WINFIT_ONLINE,
    loadComponent: () => import('./components/winfit-online/winfit-online.component')
      .then(c => c.WinfitOnlineComponent),
  },
  {
    path: ROUTE.CMS_ADMIN,
    loadChildren: () => import('./modules/admin/admin.module')
      .then(m => m.AdminModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE.CMS_MAIN,
  },
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
