import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { sum } from 'lodash';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BehaviorSubject } from 'rxjs';
import {
  AppConfigService,
  AssetsLink,
  CommonService,
  FIRESTORE_COLLECTION,
  FirebaseService,
  IAntTableElement,
  IApiBaseMeta,
  IFirestoreWinfitOnline,
  ManagerPageLayoutComponent,
  SearchInputLayoutComponent,
  SelectListLayoutComponent,
  TableLayoutComponent,
  UserService,
} from 'tt-library-angular-porfolio';

@Component({
  selector: 'tt-winfit-online',
  templateUrl: './winfit-online.component.html',
  styleUrls: ['./winfit-online.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TableLayoutComponent,
    SearchInputLayoutComponent,
    SelectListLayoutComponent,
    ManagerPageLayoutComponent,
    AssetsLink,
    NzSelectModule,
    NzToolTipModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
  ]
})
export class WinfitOnlineComponent implements OnInit {
  //#region Variable
  isExtUserChecked = false;
  isVisibleModal = false;
  // params = new UserParams(null);

  winfitData: IFirestoreWinfitOnline[] = [];
  data = {
    currentUserId: '',
    roles: [] as any[],
    externalUser: '',
    columnShows: [] as string[],
    nzScroll: { x: '2400px', y: '60vh' },
  }
  errorMsg = '';
  loading = {
    divisions: true,
    list: true,
    role: true,
    detail: false,
    saving: false,
    resetPass: false
  }
  validateMdForm!: FormGroup;
  // lengthUI = LENGTH_UI;
  // defaultPassword = USER_DEFAULT_INPUT.PASSWORD;
  columnsField = {
    customerName: 'customerName',
    customerPhoneNumber: 'customerPhoneNumber',
    customerEmail: 'customerEmail',
    bmi: 'bmi',
    bmr: 'bmr',
    action: 'action',
  };
  tableHeader: IAntTableElement<string>[] = [
    {
      title: "TABLE.CUSTOMER_NAME_WINFIT",
      field: this.columnsField.customerName,
      width: 150,
      nzLeft: true,
    },
    {
      title: "TABLE.CUSTOMER_PHONE_NUMBER_WINFIT",
      field: this.columnsField.customerPhoneNumber,
      width: 100
    },
    {
      title: "TABLE.CUSTOMER_EMAIL_WINFIT",
      field: this.columnsField.customerEmail,
      width: 150
    },
    {
      title: "TABLE.BMR",
      field: this.columnsField.bmr,
      width: 50,
      align: 'right',
    },
    {
      title: "TABLE.BMI",
      field: this.columnsField.bmi,
      width: 50,
      align: 'right',
    },
    {
      title: "TABLE.ACTION",
      field: this.columnsField.action,
      width: 100,
      align: 'center'
    }
  ]
  // systemAction = SYSTEM_ACTION;
  // urlExport: string = '/user-service/user/admin/export';
  // TYPE_OF_FILE = TYPE_OF_FILE;
  hidePass = false;
  disablePass = false;
  collectionName: string = FIRESTORE_COLLECTION.WINFIT_ONLINE;
  dataColumnShows$: BehaviorSubject<string[]> = new BehaviorSubject(this.data.columnShows);

  // get showSaleRepByRoleType() {
  //   const _allowRoleTypes = [ROLE_TYPE.SALE_REP];
  //   return _allowRoleTypes.includes(this.data.userMd.roleType);
  // }

  // get showSoldShipSLOC() {
  //   const _allowRoleTypes = [ROLE_TYPE.HOSPITAL];
  //   const _findRole = this.data.roles.find(t => t.code === this.validateMdForm.controls['roleName'].value || '') || this.data.userMd.roleType || '';
  //   return this.isExtUserChecked && _allowRoleTypes.includes(_findRole['roleType'] || _findRole);
  // }

  //#region For TW only
  // fieldError = {
  //   REQUIRED: 'required'
  // }
  // valueType = valueType;
  // allowFields = [
  //   {
  //     field: valueType.SHIP_TO,
  //     required: true,
  //     errors: [] as string[]
  //   },
  //   {
  //     field: valueType.SOLD_TO,
  //     required: true,
  //     errors: [] as string[]
  //   },
  //   {
  //     field: valueType.STORAGE,
  //     required: true,
  //     errors: [] as string[]
  //   }
  // ];
  // getAllowFields(_field: string) {
  //   return _.find(this.allowFields, { field: _field });
  // }
  //#endregion
  constructor(
    private userService: UserService,
    private configService: AppConfigService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private commonService: CommonService,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit(): void {
    this.parseParams();
    this.data.currentUserId = this.userService._uuid;
    this.validatorMd();
    this.data.columnShows = this.tableHeader.map(elm => elm.field);
    this.dataColumnShows$.next(this.data.columnShows);
    this.calcTableWidth();
  }

  //#region Api call
  getList() {
    this.loading.list = true;
    this.firebaseService.getCollection(this.collectionName).subscribe({
      next: resp => {
        this.winfitData = resp.map((item: any) => {
          return {
            ...item,
          }
        });
        console.log(this.winfitData);
        this.loading.list = false;
      },
      error: error => {
        this.loading.list = false;
      },
    });
  }
  //#endregion

  //#region Local functions
  calcTableWidth() {
    const x = sum(this.tableHeader.map(t => this.isCheckedColumns(t.field) && t.width || 0)) + 'px';
    this.data.nzScroll = { ...this.data.nzScroll, x }
  }

  isCheckedColumns(field: string): boolean {
    return this.data.columnShows.includes(field);
  }

  parseParams(_changeUrl = false) {
    // const object = Helpers.convertParamsToObject(Helpers.getParamString());
    // // parse params to model
    // this.params = new UserParams(object);
    // if (_changeUrl) {
    //   this.changeUrl();
    // }
    this.getList();
  }
  changeUrl() {
    // this.params = new UserParams(this.params);
    // this.router.navigate([], { queryParams: this.params, queryParamsHandling: 'merge' });
    // this.getList();
  }
  onSearch(evt?: IApiBaseMeta) {
    // if (evt) {
    //   this.params.pageSize = evt.pageSize;
    //   this.params.pageNumber = evt.pageNumber || 1;
    // } else {
    //   this.params.pageNumber = 1;
    // }
    this.changeUrl();
  }
  onReset() {
    // this.params = new UserParams(null);
    this.changeUrl();
  }
  onRefresh() {
    this.changeUrl();
  }

  validatorMd() {}
  submitMdForm() {}
  // #endregion
}
