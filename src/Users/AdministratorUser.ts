import { SystemRole } from "interfaces";

import { User, UserDecorator } from "Users/User";

export class AdministratorUser extends UserDecorator {
  public constructor(user: User) {
    super(SystemRole.Admin, user);
  }
}
