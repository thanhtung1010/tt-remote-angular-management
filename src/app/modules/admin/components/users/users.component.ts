import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { sum } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import {
  AppConfigService,
  CommonService,
  IAntTableElement,
  UserService,
  FIRESTORE_COLLECTION,
  FirebaseService,
  IFirestoreUser,
  IApiBaseMeta,
} from 'tt-library-angular-porfolio';

@Component({
  selector: 'tt-user-setting',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  @Output() oChangeValue = new EventEmitter();
  //#region Variable
  isExtUserChecked = false;
  isVisibleModal = false;
  // params = new UserParams(null);

  divisionList = [];
  divisions: string[] = [];
  divisionColumnWidth = 60;
  dataOutput: any = {};
  userData: IFirestoreUser[] = [];
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
    select: 'select',
    fullName: 'fullName',
    email: 'email',
    role: 'role',
    phoneNumber: 'phoneNumber',
    action: 'action',
  };
  tableHeader: IAntTableElement<string>[] = [
    {
      title: "TABLE.SELECT",
      field: this.columnsField.select,
      width: 50,
      align: 'center',
      nzLeft: true,
    },
    {
      title: "TABLE.FULL_NAME",
      field: this.columnsField.fullName,
      width: 150
    },
    {
      title: "TABLE.EMAIL",
      field: this.columnsField.email,
      width: 200
    },
    {
      title: "TABLE.PHONE_NUMBER",
      field: this.columnsField.phoneNumber,
      width: 150
    },
    {
      title: "TABLE.ROLE",
      field: this.columnsField.role,
      width: 100
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
  collectionName: string = FIRESTORE_COLLECTION.USERS;
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
        this.userData = resp.map((item: any) => {
          return {
            ...item,
          }
        });
        console.log(this.userData);
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
  onExportExcel() { }
  onAdd() {
    // this.data.userMd = new UserModel(null);
    this.disablePass = false;
    // this.createDivisionMd();
    this.setCheckAllDivision();
    this.validatorMd();
    this.onToggleModal(true);
    this.onCheckAllDivision(true);
  }
  onSaveUser() {
    this.submitMdForm();
  }
  onToggleModal(_visible: boolean) {
    // this.validateMdForm.reset();
    // for (const key in this.validateMdForm.controls) {
    //   if (this.validateMdForm.controls.hasOwnProperty(key)) {
    //     this.validateMdForm.controls[key].markAsPristine();
    //     this.validateMdForm.controls[key].updateValueAndValidity();
    //   }
    // }
    // this.validateMdForm.patchValue({
    //   divisionList: this.createDivisionMd(),
    //   // password: this.defaultPassword
    // })
    // this.setCheckAllDivision();
    // this.data.saleRepName = ''
    // this.data.showSaleRepNameErr = false
    // this.data.showSaleRepName = false
    // this.data.showSoldShipSLOC = false

    // this.errorMsg = '';
    // this.isVisibleModal = _visible;
  }
  onToggleActive(item: any) {
    // const postObj = {
    //   deactive: item.active
    // };
    // this.userService.toggleActive(item.userId, postObj).subscribe((val: any) => {
    //   this.onRefresh();
    //   this.showSuccess()
    // });
  }
  onUpdate(item: any) {
    // this.loading.detail = true;
    // this.data.saleRepName = '';
    // this.disablePass = true;
    // this.userService.getDetail(item.userId).subscribe((val: any) => {
    //   if (val && val.data) {
    //     this.data.userMd = new UserModel(val.data);
    //     this.data.userMd.divisionList = this.createDivisionMd(this.data.userMd.divisionList);
    //     this.setCheckAllDivision();
    //     this.loading.detail = false;

    //     // #region For TW only
    //     // External User
    //     if (this.isTW) {
    //       this.isExtUserChecked = this.data.userMd.isExUser || false;
    //       this.dataOutput[this.valueType.SOLD_TO] = this.data.userMd.externalUser.soldToCode || null;
    //       this.dataOutput[this.valueType.SHIP_TO] = this.data.userMd.externalUser.shipToCode || null;
    //       this.dataOutput[this.valueType.STORAGE] = this.data.userMd.externalUser.storageCode || null;
    //     }
    //     // #endregion

    //     this.validatorMd();

    //     this.validateMdForm.addControl('usernameDelegations', new FormControl('usernameDelegations', []));
    //     const _list = _.uniq(this.data.userMd.usernameDelegations || []);
    //     this.validateMdForm.patchValue({ usernameDelegations: _list })

    //     // this.data.saleRepName = this.data.userMd.saleRepCode || '';
    //     this.data.saleRepName = this.data.userMd.saleRepCodes;
    //     this.data.showSaleRepName = this.showSaleRepByRoleType;
    //     this.data.showSaleRepNameErr = _.isEmpty(this.data.saleRepName);
    //     this.data.showSoldShipSLOC = this.showSoldShipSLOC;

    //     this.validateMdForm.patchValue(this.data.userMd);

    //     if (this.data.userMd.bscAccount)
    //       this.validateMdForm.removeControl('password');
    //     // else
    //     //   this.validateMdForm.patchValue({password: this.defaultPassword});
    //   }
    // }, err => { }, () => {
    //   this.loading.detail = false;
    //   this.getAllUser();
    // });

    this.onToggleModal(true);
  }
  submitMdForm() {
    // if (this.disablePass && this.validateMdForm.controls['password']){
    //   this.validateMdForm.controls['password'].setValidators([]);
    // }
    // for (const i in this.validateMdForm.controls) {
    //   if (this.validateMdForm.controls.hasOwnProperty(i)) {
    //     this.validateMdForm.controls[i].markAsDirty();
    //     this.validateMdForm.controls[i].updateValueAndValidity();
    //   }
    // }
    // if (this.data.showSaleRepName && _.isEmpty(this.data.saleRepName) && !this.isExtUserChecked) {
    //   this.data.showSaleRepNameErr = true;
    //   return;
    // }

    // const isValidInTW = this.checkValidForTW();

    // if (this.validateMdForm.valid && isValidInTW) {
    //   this.loading.saving = true;
    //   const _objMd = {
    //     ...this.validateMdForm.value,
    //     password: !this.disablePass && this.validateMdForm.value['password'] ? this.validateMdForm.value.password : '',
    //     role: {
    //       code: this.validateMdForm.value.roleName,
    //       name: this.validateMdForm.value.roleName
    //     },
    //     divisions: this.validateMdForm.value.divisionList
    //       .filter((item: any) => item.checked)
    //       .map((divisionCode: any) => {
    //         return {
    //           code: divisionCode.value,
    //           name: divisionCode.value
    //         }
    //       }),
    //     bscAccount: this.validateMdForm.value['bscAccount'] === null ? false : (
    //       this.data.userMd && this.data.userMd.userId ?
    //         this.data.userMd.bscAccount : this.validateMdForm.value.bscAccount
    //     ),
    //     // saleRepCode: `${this.data.saleRepName}`,
    //     saleRepCodes: this.data.saleRepName || [],
    //     email: this.validateMdForm.value["email"] ? this.validateMdForm.value.email : ''
    //   }
    //   // #region For TW only
    //   if (this.isTW) {
    //     // External User
    //     _objMd.isExUser = this.isExtUserChecked;
    //     _objMd.externalUser = {
    //       soldToCode: this.showSoldShipSLOC ? this.dataOutput[this.valueType.SOLD_TO] : null,
    //       shipToCode: this.showSoldShipSLOC ? this.dataOutput[this.valueType.SHIP_TO] : null,
    //       storageCode: this.showSoldShipSLOC ? this.dataOutput[this.valueType.STORAGE] : null,
    //     };
    //   }
    //   // #endregion

    //   delete _objMd['divisionList'];
    //   let _subscribe;
    //   if (this.data.userMd && this.data.userMd.userId) {
    //     // UPDATE
    //     _subscribe = this.isExtUserChecked ?
    //       this.userService.updateExternalUser(this.data.userMd.userId, _objMd) : this.userService.updateUser(this.data.userMd.userId, _objMd);
    //   } else {
    //     // CREATE
    //     _subscribe = this.isExtUserChecked ?
    //       this.userService.createExternalUser(_objMd) : this.userService.createUser(_objMd);
    //   }
    //   _subscribe.subscribe((val: any) => {
    //     this.onRefresh();
    //     this.showSuccess();
    //     this.onToggleModal(false);
    //     this.onResetExternal();
    //   }, err => {
    //     console.error(err, err.error['error_code'] === 4041);
    //     this.loading.saving = false;
    //     this.errorMsg = getSystemMsgByCode(err.error['error_code']) as string;
    //     this.showError(this.errorMsg);
    //   }, () => {
    //     this.loading.saving = false;
    //   });

    // }
  }
  showSuccess() {
    this.commonService.showSuccess();
  }
  showError(_msg: string) {
    this.commonService.showError();
  }
  validatorMd() {
    // this.validateMdForm = this.fb.group({
    //   email: [null, this.isExtUserChecked ? [nullAbleEmailPatternValidator] : [Validators.required, emailPatternValidator]],
    //   fullName: [null, [Validators.required]],
    //   username: [null, [Validators.required, noWhitespaceValidator]],
    //   roleName: [null, [Validators.required]],
    //   password: [null, [Validators.required, Validators.minLength(14), noWhitespaceValidator]],
    //   divisionList: [null, []],
    //   bscAccount: [null, []],
    //   checkAllDivision: [null],
    // });
  }
  setValidatorPassword(evt: any){
    // if (this.validateMdForm.controls[evt.controlName]){
    //   this.validateMdForm.controls[evt.controlName].setValidators(evt.validators);
    // }
  }
  // get showInputPassword(){
  //   if (!this.data.userMd.userId){
  //     return true;
  //   }else{
  //     return !this.data.userMd.bscAccount;
  //   }
  // }
  // get isAdmin(){
  //   return this.sessionService.isAdmin();
  // }
  addPassWordControl() {
    // this.validateMdForm.addControl('password',
    //   new FormControl('password', [Validators.required, Validators.minLength(14), noWhitespaceValidator]),
    // );
  }
  onResetPassword() {
    // this.message.error(this.translate.instant('error.maintaining'))
    this.disablePass = false;
  }
  // firstErrorsByControl(_control: AbstractControl) {
  //   return Helpers.getFirstErrorAbstract(_control);
  // }
  onChangeBscAccountCheckBox() {
    // if (this.validateMdForm.get('bscAccount')?.value) {
    //   this.validateMdForm.removeControl('password');
    //   this.hidePass = true;
    //   this.isExtUserChecked = false; // uncheck "For External User"
    // } else {
    //   this.hidePass = false;
    //   this.addPassWordControl();
    // }
    // this.onShowSoldShipSLOC(this.validateMdForm.controls['roleName'].value || '');
  }
  onCheckExternalUser() {
    // this.validateMdForm.controls["email"].setValidators(this.isExtUserChecked ? [nullAbleEmailPatternValidator] : [Validators.required, emailPatternValidator]);
    // if (this.validateMdForm.controls.hasOwnProperty("email")) {
    //   this.validateMdForm.controls["email"].markAsDirty();
    //   this.validateMdForm.controls["email"].updateValueAndValidity();
    // }
    // if (this.isExtUserChecked) {
    //   this.validateMdForm.controls['bscAccount'].setValue(false); // uncheck "BSC Account"
    // }
    // this.onShowSoldShipSLOC(this.validateMdForm.controls['roleName'].value || '');
    // this.checkValidForTW();
  }
  onChangeRole(evt: any) {
    // if (evt) {
    //   const _findRole = this.data.roles.find(t => t.code === evt);
    //   this.data.saleRepName = '';
    //   this.data.showSaleRepNameErr = false
    //   // comment for hot TW fixed
    //   if (_findRole && [ROLE_TYPE.SALE_REP].includes(_findRole['roleType'] || '')) {
    //     this.data.showSaleRepName = true;
    //   } else {
    //     this.data.showSaleRepName = false;
    //   }
    //   this.onShowSoldShipSLOC(evt);
    // }
  }
  onShowSoldShipSLOC(_code: string) {
    // const _findRole = this.data.roles.find(t => t.code === _code);
    // this.data.showSoldShipSLOC = false;
    // if (_findRole && [ROLE_TYPE.HOSPITAL].includes(_findRole['roleType'] || '') && this.isExtUserChecked) {
    //   this.data.showSoldShipSLOC = true;
    // }
  }
  onChangeSaleRep(evt: any) {
    // if (evt) {
    //   this.data.saleRepName = evt.map((item: any) => item.code) || '';
    //   this.data.showSaleRepNameErr = false
    // } else {
    //   this.data.saleRepName = '';
    //   this.data.showSaleRepNameErr = true
    // }
  }

  onCheckAllDivision(checked: boolean) {
    // this.validateMdForm.patchValue({
    //   divisionList: this.validateMdForm.value.divisionList.map((x: any) => ({ ...x, checked: checked }))
    // })
  }

  setCheckAllDivision() {
    // this.validateMdForm.patchValue({
    //   checkAllDivision: this.checkAllDivision()
    // })
  }

  // get getExportData() {
  //   return { ...this.params, ...this.data.param }
  // }
  //#endregion

  // #region External User
  // checkValidForTW(): boolean {
    // this.allowFields.forEach(item => {
    //   const _value = this.dataOutput[item.field];
    //   if (item.required) {
    //     if (_.isNull(_value) || _.isUndefined(_value) || _.isEmpty(_value)) {
    //       if (item.errors.indexOf(this.fieldError.REQUIRED) < 0) {
    //         item.errors.push(this.fieldError.REQUIRED);
    //       }
    //     } else {
    //       item.errors = item.errors.filter(t => t !== this.fieldError.REQUIRED);
    //     }
    //   }
    // });
    // if (!this.data.showSoldShipSLOC) {
    //   return true;
    // }
    // if (!this.allowFields.some(t => t.errors.length > 0)) {
    //   return true;
    // }
    // if (!this.isExtUserChecked) {
    //   return true;
    // }
    // return false;
  // }
  onChangeCommonSearch(event: any, type: string) {
    // const oldValue = _.cloneDeep(this.dataOutput[type + 'Object']);
    // this.dataOutput[type + 'Object'] = event;
    // switch (type) {
    //   case this.valueType.SOLD_TO:
    //     this.dataOutput[this.valueType.SOLD_TO] = event?.code;
    //     break;

    //   case this.valueType.SHIP_TO:
    //     this.dataOutput[this.valueType.SHIP_TO] = event?.code;
    //     break;

    //   case this.valueType.STORAGE:
    //     this.dataOutput[this.valueType.STORAGE] = event?.code;
    //     break;
    // }
    // if (type === this.valueType.SOLD_TO) {
    //   if (oldValue?.code !== event?.code && oldValue) {
    //     setTimeout(() => {
    //       this.dataOutput[this.valueType.SHIP_TO + 'Object'] = null;
    //       this.dataOutput[this.valueType.STORAGE + 'Object'] = null;
    //       this.dataOutput[this.valueType.SHIP_TO] = '';
    //       this.dataOutput[this.valueType.STORAGE] = '';
    //     }, 50)
    //   }
    // }
    // this.checkValidForTW();
  }
  // #endregion
}
