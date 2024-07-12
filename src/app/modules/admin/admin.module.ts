import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AssetsLink,
  ManagerPageLayoutComponent,
  ROUTE,
  SearchInputLayoutComponent,
  SelectListLayoutComponent,
  SharedModule,
  TableLayoutComponent,
} from 'tt-library-angular-porfolio';
import { UserManagementComponent, UsersComponent, RolesComponent } from "./components";
import { TranslateModule } from "@ngx-translate/core";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';

const routes: Route[] = [
  {
    path: ROUTE.CMS_ADMIN_USERS,
    component: UserManagementComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE.CMS_ADMIN_USERS
  }
];

@NgModule({
  declarations: [
    UserManagementComponent,
    UsersComponent,
    RolesComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,

    NzSelectModule,
    NzButtonModule,
    NzToolTipModule,
    NzModalModule,
    NzFormModule,
    NzTableModule,
    NzCheckboxModule,
    NzInputModule,

    AssetsLink,
    ManagerPageLayoutComponent,
    TableLayoutComponent,
    SearchInputLayoutComponent,
    SelectListLayoutComponent,
  ],
})

export class AdminModule {}
