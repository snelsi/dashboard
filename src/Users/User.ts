import { SystemRole } from "interfaces";

export class User {
  public userId: number;
  public name: string;
  public login: string;
  public password: string;

  private userRole: SystemRole;

  public constructor(role: SystemRole) {
    this.setUserRole(role);
  }

  public setUserRole(role: SystemRole) {
    this.userRole = role;
  }

  public getUserRole(): SystemRole {
    return this.userRole;
  }
}
