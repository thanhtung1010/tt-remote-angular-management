import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { sum } from 'lodash';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BehaviorSubject } from 'rxjs';
import {
  AssetsLink,
  BaseIndexWinfitModel,
  CommonService,
  FIRESTORE_COLLECTION,
  FirebaseService,
  Helpers,
  IAntTableElement,
  IApiBaseMeta,
  IFirestoreCustomerWinfitOnline,
  IFirestoreWinfitOnline,
  ManagerPageLayoutComponent,
  SearchInputLayoutComponent,
  SelectListLayoutComponent,
  TableLayoutComponent,
  UserService,
  WinfitOnlineService
} from 'tt-library-angular-porfolio';
import { BMRPerAgePipe } from '../../_pipes';

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
    BMRPerAgePipe,
    NzSelectModule,
    NzToolTipModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzRadioModule,
  ]
})
export class WinfitOnlineComponent implements OnInit {
  //#region Variable
  data = {
    currentID: '',
    detail: new BaseIndexWinfitModel(null),
    columnShows: [] as string[],
    nzScroll: { x: 2400, y: '60vh' },
  }
  loading = {
    list: false,
    detail: false,
    save: false,
    delete: false,
  }
  columnsField = {
    customerName: 'customerName',
    customerPhoneNumber: 'customerPhoneNumber',
    customerEmail: 'customerEmail',
    bmi: 'bmi',
    bmr: 'bmr',
    action: 'action',
  };
  params = {
    customerName: '',
  };

  detailForm!: FormGroup;
  baseWinfitOnlineData = this.winfitService.baseWinfitOnlineData;
  winfitData: IFirestoreWinfitOnline[] = [];
  tableHeader: IAntTableElement<string>[] = [
    {
      title: "TABLE.CUSTOMER_NAME_WINFIT",
      field: this.columnsField.customerName,
      width: 170,
    },
    {
      title: "TABLE.CUSTOMER_PHONE_NUMBER_WINFIT",
      field: this.columnsField.customerPhoneNumber,
      width: 150,
    },
    {
      title: "TABLE.CUSTOMER_EMAIL_WINFIT",
      field: this.columnsField.customerEmail,
      width: 170,
    },
    {
      title: "TABLE.BMR",
      field: this.columnsField.bmr,
      width: 100,
      align: 'right',
    },
    {
      title: "TABLE.BMI",
      field: this.columnsField.bmi,
      width: 100,
      align: 'right',
    },
    {
      title: "TABLE.ACTION",
      field: this.columnsField.action,
      width: 130,
      align: 'center',
    }
  ];

  isVisibleModal = false;
  collectionName: string = FIRESTORE_COLLECTION.WINFIT_ONLINE;
  dataColumnShows$: BehaviorSubject<string[]> = new BehaviorSubject(this.data.columnShows);
  //#endregion
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private firebaseService: FirebaseService,
    private router: Router,
    private winfitService: WinfitOnlineService,
  ) { }

  ngOnInit(): void {
    this.parseParams();
    this.data.columnShows = this.tableHeader.map(elm => elm.field);
    this.dataColumnShows$.next(this.data.columnShows);
    this.calcTableWidth();

    this.winfitService.baseIndexWinfit$.subscribe(resp => {
      this.data.detail = resp;
    });
  }

  //#region Api call
  getList() {
    this.loading.list = true;
    this.firebaseService.searchDocument(
      this.collectionName,
      this.userService._uuid,
      {field: 'customerName', value: this.params.customerName}
    ).subscribe({
      next: resp => {
        this.winfitData = resp.map((item: any) => {
          return {
            ...item,
          }
        });
        this.loading.list = false;
      },
      error: error => {
        this.loading.list = false;
      },
    });
  }

  getDetail(id: string) {
    if (!id) {
      this.commonService.showError();
      return;
    }

    this.loading.detail = true;
    this.firebaseService.searchDocumentWithID<IFirestoreWinfitOnline>(this.collectionName, this.userService._uuid, id).subscribe(resp => {
      if (resp) {
        this.winfitService.setIndexWinfit = new BaseIndexWinfitModel(resp);
        this.initDetailForm(resp);
      } else {
        this.commonService.showError();
        this.data.currentID = '';
      }
      this.loading.detail = false;
    });
  }

  deleteWinfitItem(id: string) {
    if (!id) {
      this.commonService.showError();
      return;
    }

    this.loading.delete = true;
    this.firebaseService.deleteDocumentWithID<IFirestoreWinfitOnline>(this.collectionName, id).subscribe(resp => {
      if (resp) {
        this.commonService.showSuccess();
        this.getList();
      } else {
        this.commonService.showError();
      }
      this.loading.delete = false;
      this.data.currentID = '';
    });
  }

  onClickSaveWinfitItem() {
    if (this.detailForm.invalid) return;

    this.loading.save = true;
    const _formValue = this.detailForm.value;
    const _value: BaseIndexWinfitModel = {
      ...this.data.detail,
      ..._formValue,
    };
    this.winfitService.setIndexWinfit = _value;

    this.winfitService.deleteWinfit(this.data.currentID).subscribe(resp => {
      if (resp) {
        this.onToggleVisibleEditItemModal(false);
        this.detailForm.reset();
        this.getList();
        this.commonService.showSuccess();
      } else {
        this.commonService.showError();
      }
      this.loading.save = false;
    });
  }
  //#endregion

  //#region Local functions
  calcTableWidth() {
    const x = sum(this.tableHeader.map(t => this.isCheckedColumns(t.field) ? t.width || 0 : 0))
    this.data.nzScroll = { ...this.data.nzScroll, x }
  }

  isCheckedColumns(field: string): boolean {
    return this.data.columnShows.includes(field);
  }

  parseParams() {
    const object = Helpers.convertParamsToObject(Helpers.getParamString());
    this.params = {
      ...this.params,
      ...(object || {}),
    }
    this.changeUrl();
  }
  changeUrl() {
    this.router.navigate([], { queryParams: this.params, queryParamsHandling: 'merge' });
    this.getList();
  }
  onSearch(evt?: IApiBaseMeta) {
    this.changeUrl();
  }
  onReset() {
    this.params.customerName = "";
    this.changeUrl();
  }
  onRefresh() {
    this.changeUrl();
  }

  initDetailForm(detail: IFirestoreWinfitOnline) {
    this.detailForm = this.fb.group({
      customerName: [detail.customerName, [Validators.required]],
      customerEmail: [detail.customerEmail, []],
      customerPhoneNumber: [detail.customerPhoneNumber, []],
      age: [detail.age, [this.numberValidate]],
      gender: [detail.gender, [this.numberValidate]],
      heightIndex: [detail.heightIndex, [this.numberValidate]],
      weightIndex: [detail.weightIndex, [this.numberValidate]],
    });
    this.onToggleVisibleEditItemModal(true);
  }

  onChangeFormValue(type: 'gender' | 'age' | 'heightIndex' | 'weightIndex') {
    const _value = this.detailForm.value;
    switch (type) {
      case 'gender':
      case 'age':
        if (_value[type] !== this.data.detail[type]) {
          this.winfitService.calcBMR(_value);
        }
        break;

      case 'heightIndex':
        if (_value[type] !== this.data.detail[type]) {
          this.winfitService.calcBMR(_value);
          this.winfitService.calcBMI(_value);
        }
        break;

      case 'weightIndex':
        if (_value[type] !== this.data.detail[type]) {
          this.winfitService.calcBMR(_value);
          this.winfitService.calcBMI(_value);
          this.winfitService.calcWaterNeeded(_value);
        }
      break;

      default:
        break;
    }
    this.winfitService.baseIndexWinfit = _value;
  }

  numberValidate = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if ((typeof value === 'number' && value === 0) || Number.isNaN(+value)) {
      return {
        required: true,
      };
    }

    return null;
  }

  booleanValidate = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'boolean') {
      return {
        required: true,
      };
    }

    return null;
  }

  onClickEditItem(id: string) {
    this.data.currentID = id;
    this.getDetail(id);
  }

  onClickDeleteItem(id: string) {
    this.data.currentID = id;
    this.deleteWinfitItem(id);
  }

  onToggleVisibleEditItemModal(visible: boolean) {
    this.isVisibleModal = visible;
    if (!visible) {
      this.data.currentID = '';
      this.detailForm.reset();
    }
  }
  // #endregion
}
