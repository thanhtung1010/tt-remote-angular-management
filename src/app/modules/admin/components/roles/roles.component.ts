import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { GlobalConfig } from '@cores/_enums';
// import { IApiBaseMeta } from '@cores/_interfaces';
// import { ITableElement } from '@shares/_interfaces';
// import { IAction, IModule, IModuleAction, IRole, IRoleType } from '../../_interfaces';
// import { RoleService } from '../../_services/role.service';
// import * as _ from 'lodash'
// import { TranslateService } from '@ngx-translate/core';
// import { NzMessageService } from 'ng-zorro-antd/message';
// import { getSystemMsgByCode } from '@config/errors.enum';
// import { SYSTEM_ACTION } from '@config/role.enum';
// import { RoleParams } from '../../_models';
// import { Helpers } from '@cores/_helpers';
// // import { NzTableQueryParams } from 'ng-zorro-antd/table';
// import { Router } from '@angular/router';

@Component({
  selector: 'tt-role-setting',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  //#region Variable
  // roleModify!: IRole;
  // isVisibleModal = false;

  // params = new RoleParams(null);

  // data = {
  //   list: [] as IRole[],
  //   param: {
  //     totalPages: 0,
  //     pageSize: GlobalConfig.ITEMS_PER_PAGE,
  //     pageNumber: 1
  //   } as IApiBaseMeta,
  //   changed: false
  // }
  // loading = {
  //   list: false,
  //   saving: false,
  //   permission: false
  // }

  // tableHeader: ITableElement[] = [
  //   {
  //     title: "TABLE.ROLE.ROLE_NAME",
  //     field: "roleName",
  //     colSpan: 2
  //   },
  //   {
  //     title: "TABLE.ROLE.CREATED_DATE",
  //     field: "createdDtm",
  //     colSpan: 1
  //   },
  //   {
  //     title: "TABLE.ROLE.CREATED_BY",
  //     field: "createdBy",
  //     colSpan: 1
  //   },
  //   {
  //     title: "TABLE.ACTION",
  //     field: "",
  //     colSpan: 1
  //   }
  // ]

  // listActions: IAction[] = [];
  // listModules: IModule[] = [];

  // dataModule = {
  //   list: [] as IModule[],
  //   // checkAllShowHide: true,
  //   // visibleShowHide: false,
  //   param: {
  //     totalPages: 1,
  //     pageSize: GlobalConfig.ITEMS_PER_PAGE,
  //     pageNumber: 1
  //   } as IApiBaseMeta
  // }

  // permissions: Array<any> = [];
  // addRoleForm!: FormGroup;
  // listRoleType: IRoleType[] = [];
  // listRoleCopy: IRole[] = [];
  // roleCopy!: IRole;

  // errorMsg!: string;
  // systemAction = SYSTEM_ACTION;
  //#endregion



  constructor(
    // private roleService: RoleService,
    // private fb: FormBuilder,
    // private translate: TranslateService,
    // private message: NzMessageService,
    // private router: Router
  ) { }

  ngOnInit(): void {

    // const object = Helpers.convertParamsToObject(Helpers.getParamString());
    // // parse params to model
    // this.params = new RoleParams(object);

    // this.changeUrl();

    // this.addRoleForm = this.fb.group({
    //   roleName: [null, [Validators.required, Validators.maxLength(255)]],
    //   roleType: [null],
    // });

    // this.getActions();
    // this.getModules();
  }

  //#region Api call
  // getList() {
  //   this.loading.list = true;
  //   this.roleService.getRoles(this.params).subscribe(
  //     resp => {
  //       if (resp && resp.data && resp.data.length > 0) {
  //         this.data.list = resp.data;
  //         this.data.param.pageSize = this.params.pageSize;
  //         this.data.param.pageNumber = this.params.pageNumber;
  //         this.data.param.totalPages = resp.meta.totalPages;
  //         this.data.param.totalElements = resp.meta.totalElements;
  //       } else {
  //         this.data.param.pageSize = 0;
  //         this.data.param.pageNumber = 1;
  //         this.data.param.totalPages = 0;
  //         this.data.param.totalElements = 0;
  //       }

  //       this.loading.list = false;
  //     },
  //     error => {
  //       console.error('', error);
  //       this.loading.saving = false;
  //       this.errorMsg = getSystemMsgByCode(error.error['error_code']) as string;
  //       this.showError(this.errorMsg);
  //     },
  //     () => {
  //       this.loading.list = false;

  //     }
  //   )
  // }

  // getActions() {
  //   this.roleService.getActions().subscribe((actions: { data: IAction[]; }) => {
  //     if (actions && actions.data && actions.data.length > 0) {
  //       actions.data.forEach((action: IAction) => {
  //         //map key code to translate
  //         let name: string = action.code;
  //         action.name = name;
  //         this.listActions.push(action);
  //       });

  //     }
  //   });
  // }

  // getModules() {
  //   this.listModules = [];
  //   this.roleService.getModules().subscribe((modules: { data: IModule[]; }) => {
  //     if (modules && modules.data && modules.data.length > 0) {
  //       let idx = 1;
  //       modules.data.forEach(md => {
  //         md.hasChild = this.checkHasChild(modules.data, md.code);
  //       });
  //       const lst = _.orderBy(modules.data, ['code', 'parent'], ['asc', 'asc'])
  //       this.listModules = Array.from(lst);

  //       console.log(this.listModules)
  //     }
  //   })
  // }

  // getListRoleType() {
  //   this.roleService.getRoleTypes().subscribe(
  //     resp => {
  //       if (resp && resp.data && resp.data) {
  //         this.listRoleType = _.orderBy(resp.data as IRoleType[], ['roleTypeName']);
  //       } else {
  //         this.listRoleType = []
  //       }
  //     },
  //     error => {
  //       console.error('', error);
  //       const errorMsg = getSystemMsgByCode(error.error['error_code']) as string;
  //       this.showError(errorMsg);
  //     }
  //   )
  // }

  // getAllRole() {
  //   this.roleService.getRoles().subscribe(
  //     resp => {
  //       if (resp && resp.data && resp.data.length > 0) {
  //         let listRole = resp.data.filter((role: IRole) => role.code !== ROLE.ADMINISTRATOR) as IRole[];
  //         this.listRoleCopy = _.orderBy(listRole, ['name']);
  //       } else {
  //         this.listRoleCopy = [];
  //       }
  //     },
  //     error => {
  //       console.error('', error);
  //       const errorMsg = getSystemMsgByCode(error.error['error_code']) as string;
  //       this.showError(errorMsg);
  //     },
  //     () => {
  //       this.loading.list = false;

  //     }
  //   )
  // }

  // initMdTable() {
  //   let isAdd: boolean = (this.roleModify && this.roleModify.code) ? false : true;

  //   if (!this.listRoleType || this.listRoleType.length == 0) {
  //     this.getListRoleType();
  //   }

  //   if (!this.listRoleCopy || this.listRoleCopy.length == 0 || this.data.changed) {
  //     this.getAllRole();
  //   }

  //   let listModule = this.listModules.map(t => Object.assign({}, t));

  //   if (isAdd) {
  //     this.addRoleForm.patchValue({ roleType: ROLE_TYPE.SALE_REP })
  //     listModule.forEach(module => {
  //       let actions: IAction[] = this.listActions.map(act => Object.assign({}, act));
  //       const _isHome = module.code === MODULE.HOME;
  //       module.actions = actions;
  //       if (_isHome) {
  //         module.actions.forEach(act => {
  //           act.checked = true;
  //           act.disabled = true;
  //         })
  //         module.disabled = true;
  //       }
  //       return module;
  //     });

  //     this.dataModule.list = [...listModule];
  //     this.dataModule.param = {
  //       pageSize: listModule.length,
  //       pageNumber: 1,
  //       totalPages: 1
  //     }
  //   }
  //   else {
  //     this.addRoleForm.patchValue({ roleName: this.roleModify.name, roleType: this.roleModify.roleType });

  //     this.permissions = [];
  //     this.dataModule.list = [...listModule];
  //     this.setPermission([...listModule], this.roleModify.code);
  //   }
  // }
  // //#endregion

  // //#region Local functions
  // changeUrl() {
  //   this.router.navigate([], { queryParams: this.params, queryParamsHandling: 'merge' });
  //   this.getList();
  // }

  // onSearch(evt?: IApiBaseMeta) {
  //   if (evt) {
  //     this.params.pageSize = evt.pageSize;
  //     this.params.pageNumber = evt.pageNumber || 1;
  //   } else {
  //     this.params.pageNumber = 1;
  //   }
  //   this.changeUrl();
  // }

  // onReset() {
  //   this.params = new RoleParams(null);
  //   this.getList();
  // }

  // onRefresh() {
  //   this.getList();
  // }

  // onExportExcel() { }

  // onAdd() {
  //   this.initMdTable();
  //   this.onToggleModal(true);
  // }

  // onToggleModal(_visible: boolean) {
  //   this.isVisibleModal = _visible;
  //   if (!_visible) {
  //     this.roleModify = {
  //       name: '',
  //       code: '',
  //       roleType: '',
  //       createdAt: 0,
  //       createdBy: ''
  //     };
  //     this.addRoleForm.reset();
  //     this.roleCopy = { ...this.roleModify };
  //   }
  // }

  // onUpdate(item: any) {
  //   this.roleModify = item;
  //   this.initMdTable();
  //   this.onToggleModal(true);
  // }

  // onDelete(item: IRole) {
  //   this.data.changed = true;
  //   this.roleService.deleteRole(item.code).subscribe(_ => {
  //     this.showSuccess();
  //     this.getList();
  //   }, err => {
  //     if (err['error'] && (err.error['error_code'] === 4041 || err.error['status'] === 404)) { // not found something
  //       this.errorMsg = 'ADMIN.ROLE.ROLE_NOT_FOUND';
  //     } else {
  //       this.errorMsg = getSystemMsgByCode(err.error['error_code']) || '';
  //     }
  //     this.showError(this.errorMsg);
  //   })
  //     , () => {
  //       this.loading.saving = false;
  //     };
  // }

  // onSaveRole() {
  //   this.data.changed = true;
  //   let roleName = this.addRoleForm.value.roleName?.trim();
  //   this.addRoleForm.patchValue({ roleName: roleName });
  //   this.addRoleForm.controls.roleName.markAsDirty();
  //   this.addRoleForm.controls.roleName.updateValueAndValidity();

  //   if (this.addRoleForm.valid) {
  //     this.loading.saving = true;
  //     let dataSave: { moduleActions: IModuleAction[], name: string, roleType: string } = {
  //       moduleActions: [],
  //       name: this.addRoleForm.value.roleName,
  //       roleType: this.addRoleForm.value.roleType
  //     }
  //     this.dataModule.list.forEach(md => {
  //       let _parent = '';
  //       const actionsChecked = md.actions?.filter(action => action.checked);
  //       if (actionsChecked && actionsChecked.length > 0) {
  //         let moduleActions: IModuleAction[] = [];
  //         actionsChecked.forEach((action: IAction) => {
  //           moduleActions.push({ action: action.code, module: md.code, parent: md.parent, hasChild: md.hasChild });
  //         });
  //         _parent = md.parent || '';

  //         dataSave.moduleActions = dataSave.moduleActions.concat(moduleActions);
  //       }
  //       // check to push parent to actions
  //       if (_parent && !dataSave.moduleActions.map(t => t.module).includes(_parent)) {
  //         dataSave.moduleActions.push({ action: SYSTEM_ACTION.READ, module: _parent })
  //       }
  //     })
  //     dataSave.moduleActions = dataSave.moduleActions.filter(item =>
  //       item.parent ||
  //       (!item.hasChild && !item.parent) ||
  //       (item.hasChild && !item.parent && dataSave.moduleActions.some(t => t.parent == item.module)));


  //     let isAdd: boolean = (this.roleModify && this.roleModify.code) ? false : true;

  //     if (isAdd) {
  //       this.roleService.createRole(dataSave).subscribe(res => {
  //         this.showSuccess();
  //         this.onToggleModal(false);
  //         this.getList();
  //         this.loading.saving = false;
  //       }, err => {
  //         this.loading.saving = false;
  //         if (err['error'] && (err.error['error_code'] === 4041)) { // not found something
  //           this.errorMsg = 'ADMIN.ROLE.ROLE_NOT_FOUND';
  //         }
  //         else if (err['error'] && (err.error['error_code'] === 4093)) {
  //           this.errorMsg = 'ADMIN.ROLE.ROLE_AVAILABLE';
  //         }
  //         else {
  //           this.errorMsg = getSystemMsgByCode(err.error['error_code']) || '';
  //         }
  //         this.showError(this.errorMsg);
  //       })
  //         , () => {
  //           this.loading.saving = false;
  //         };
  //     }
  //     else {
  //       this.roleService.updateRole(this.roleModify.code, dataSave).subscribe(res => {
  //         this.showSuccess();
  //         this.onToggleModal(false);
  //         this.getList();
  //         this.loading.saving = false;
  //       }, err => {
  //         this.loading.saving = false;
  //         if (err['error'] && (err.error['error_code'] === 4041
  //           || err.error['status'] === 404)) { // not found something
  //           this.errorMsg = 'ADMIN.ROLE.ROLE_NOT_FOUND';
  //         } else {
  //           this.errorMsg = getSystemMsgByCode(err.error['error_code']) || '';
  //         }
  //       })
  //         , () => {
  //           this.loading.saving = false;
  //         };
  //     }

  //   }
  //   else {
  //   }
  // }

  // onCheckAction(checked: boolean, action: IAction, module: IModule) {
  //   const actionView = module.actions.find(act => act.code == ACTION_CODE.VIEW);
  //   if (actionView) {
  //     let idx = module.actions.indexOf(actionView);

  //     if (action && action.code != ACTION_CODE.VIEW) {

  //       if (!actionView.checked) {
  //         module.actions[idx].checked = true;
  //       }
  //       else { }
  //     }
  //     else {
  //       if (!actionView.checked) {
  //         module.actions = module.actions.map(act => {
  //           act.checked = false;
  //           return act;
  //         })
  //       }
  //       else { }
  //     }
  //   }

  // }

  // onCheckedAllByCode(evt: boolean, action: any) {
  //   if (action.code === ACTION_CODE.VIEW && evt === false) {
  //     this.dataModule.list.forEach(item => {
  //       if (item.actions && !item.disabled) {
  //         item.actions.forEach(act => {
  //           act.checked = evt;
  //         })
  //       }
  //     })
  //     return;
  //   }

  //   if (action && action['code'] !== undefined) {
  //     this.dataModule.list.forEach(item => {
  //       if (item.actions && !item.disabled) {
  //         const _actIdx = item.actions.findIndex(t => t['code'] === action['code']);
  //         if (_actIdx > -1) {
  //           item.actions[_actIdx].checked = evt;
  //         }
  //         if (action.code !== ACTION_CODE.VIEW && evt) {
  //           const _actViewIdx = item.actions.findIndex(t => t['code'] === ACTION_CODE.VIEW);
  //           if (_actViewIdx > -1) {
  //             item.actions[_actViewIdx].checked = evt;
  //           }
  //         }
  //       }
  //     })
  //   }

  //   // if (evt && action && action['code'] !== undefined) {
  //   //   const _action = action['code'];
  //   //   this.dataModule.list.forEach(item => {
  //   //     if (item.actions && !item.disabled) {
  //   //       const _actIdx = item.actions.findIndex(t => t['code'] === _action);
  //   //       if (_actIdx > -1) {
  //   //         item.actions[_actIdx].checked = evt;
  //   //       }
  //   //     }
  //   //   })
  //   // } else {
  //   //   const _action = action['code'];
  //   //   this.dataModule.list.forEach(item => {
  //   //     if (item.actions && !item.disabled) {
  //   //       const _actIdx = item.actions.findIndex(t => t['code'] === _action);
  //   //       if (_actIdx > -1) {
  //   //         item.actions[_actIdx].checked = false
  //   //       }
  //   //     }
  //   //   })
  //   // }

  //   return;
  // }

  // onCheckedAllModule(item: IModule, checked: boolean) {
  //   const idx = this.dataModule.list.findIndex(itm => itm.code === item.code);
  //   if (idx >= 0) {
  //     this.dataModule.list[idx].actions = this.dataModule.list[idx].actions.map(act => {
  //       act.checked = checked;
  //       return act;
  //     })
  //   }
  // }

  // onCheckedAll(checked: boolean) {
  //   this.dataModule.list.forEach(module => {
  //     if (module.actions && !module.disabled) {
  //       module.actions.forEach(act => {
  //         act.checked = checked;
  //       })
  //     }
  //   })
  // }

  // copyPermission(evt: any) {
  //   this.loading.permission = true;
  //   let listModule = this.dataModule.list.map((md: IModule) => {
  //     md.actions = md.actions.map((act: IAction) => ({ ...act, checked: false }));
  //     return md;
  //   })
  //   this.dataModule.list = [...listModule];
  //   this.setPermission(listModule, evt);
  //   this.loading.permission = false;
  // }

  // checkHasChild(list: Array<any>, parentCode: string): boolean {
  //   let child = list.find(item => item.parent == parentCode);
  //   if (child)
  //     return true;
  //   else
  //     return false;
  // }

  // setPermission(listModule: IModule[], roleCode: string) {
  //   this.roleService.getRolePermission(roleCode).subscribe(
  //     rolePermissions => {
  //       if (rolePermissions && rolePermissions.data
  //         && rolePermissions.data.moduleActions
  //         && rolePermissions.data.moduleActions.length > 0) {
  //         this.permissions = [...rolePermissions.data.moduleActions];

  //         listModule.forEach(module => {
  //           const actions: IAction[] = this.listActions.map(act => Object.assign({}, act));
  //           const _isHome = module.code === MODULE.HOME;
  //           actions.forEach(action => {
  //             const findPermission = this.permissions
  //               .find(perm => perm.module == module.code && perm.action == action.code);

  //             if (findPermission) {
  //               action.checked = true;
  //             }
  //             if (_isHome) {
  //               action.checked = true;
  //               action.disabled = true;
  //             }

  //             return action;
  //           });

  //           module.actions = actions;
  //           // if (actions.some(x => !x.checked)) {
  //           //   module.checkedAll = false;
  //           // }
  //           // else {
  //           //   module.checkedAll = true;
  //           // }
  //           if (_isHome) {
  //             module.disabled = true;
  //           }
  //           return module;
  //         });
  //       }
  //       else {
  //         listModule.forEach(module => {
  //           let actions: IAction[] = this.listActions.map(act => Object.assign({}, act));

  //           module.actions = actions;

  //           const _isHome = module.code === MODULE.HOME;
  //           if (_isHome) {
  //             module.actions.forEach(act => {
  //               act.checked = true;
  //               act.disabled = true;
  //             })
  //           }

  //           return module;
  //         })
  //       }

  //       this.dataModule.list = [...listModule];
  //       this.dataModule.param = {
  //         pageSize: listModule.length,
  //         pageNumber: 1,
  //         totalPages: 1
  //       }
  //     },
  //     err => {
  //       listModule.map(module => {
  //         let actions: IAction[] = this.listActions.map(act => Object.assign({}, act));
  //         module.actions = actions;
  //         return module;
  //       })

  //       this.dataModule.list = [...listModule];
  //       this.dataModule.param = {
  //         pageSize: listModule.length,
  //         pageNumber: 1,
  //         totalPages: 1
  //       }
  //     })
  // }

  // getListRoleCopy = () => {
  //   if (this.roleModify && this.roleModify.code) {
  //     return this.listRoleCopy.filter(role => role.code !== this.roleModify.code);
  //   }
  //   else {
  //     return this.listRoleCopy;
  //   }
  // }

  // showSuccess() {
  //   this.message.success(this.translate.instant('STATUS.SUCCESS'));
  // }
  // showError(_msg: string) {
  //   this.message.error(this.translate.instant(_msg));
  //   // this.errorMsg = _msg;
  // }

  // //#endregion

  // //#region
  // checkAll() {
  //   if (this.dataModule.list.some(module => !this.checkAllModule(module.code)))
  //     return false;
  //   return true;
  // }
  // checkAllAction(action: string) {
  //   // checking Check All by column
  //   if (this.dataModule.list.some(module =>
  //     module.actions.some(act =>
  //       act.code === action && !act.checked
  //     )))
  //     return false;
  //   return true;
  // }
  // checkAllModule(module: string) {
  //   // checking Check All by row
  //   const itemMd = this.dataModule.list.find(x => x.code === module);
  //   if (!itemMd || itemMd.actions.some(x => !x.checked))
  //     return false;
  //   return true;
  // }

  //#endregion
}
