import { PrivilegeAction } from '@shared/enums/privilege-action.enum';

export class Privilege {
  name: string;
  code: string;
  actions?: PrivilegeAction[];

  constructor(code: string, name?: string, actions?: PrivilegeAction[]) {
    this.code = code;
    this.name = name;
    this.actions = actions;
  }
}