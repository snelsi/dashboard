import { SystemRole } from "interfaces";

import { User, UserDecorator } from "Users/User";

export class ModeratorUser extends UserDecorator {
  public constructor(user: User) {
    super(SystemRole.Moderator, user);
  }
}
