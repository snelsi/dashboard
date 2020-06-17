import { Observer, Subject } from "interfaces";
import { GroupSubject } from "utils/Observers/Group";

export class Task implements Observer {
  private _name: string;
  private locked = false;

  public constructor(name: string) {
    this._name = name;
  }

  public getName = () => this._name;
  public setName = (newName: string) => {
    if (!this.locked) this._name = newName;
  };
  public isLocked = () => this.locked;

  public deleteSelf = () => {};

  public update(subject: Subject): void {
    if (!(subject instanceof GroupSubject)) {
      console.warn("Observer is wrong typed, GroupSubject expected");
    }

    // @ts-ignore
    switch (subject?.state) {
      case 0:
        console.log("Task: attached Group was deleted, delete task.");
        this.deleteSelf();
        break;
      case 1:
        console.log("Task: attached Group is loaded, unlock task.");
        this.locked = false;
        break;
      case 2:
        console.log("Task: attached Group is loading, lock task.");
        this.locked = true;
        break;
    }
  }
}
