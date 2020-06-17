import { Observer, Subject } from "interfaces";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class GroupSubject implements Subject {
  /**
   * Внутреннее состояние группы
   */
  private state = 1;

  /**
   *  Список подписчиков
   */
  private observers: Observer[] = [];

  public getState = () => this.state;

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer has been attached already.");
    }

    console.log("Subject: Attached an observer.");
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer.");
  }

  public notify(): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  // Пример бизнес-логики
  public async update() {
    console.log("Group: Updating...");
    this.state = 2;
    this.notify();

    // Симулировать загрузку
    await delay(3000);

    console.log(`Group: Updated`);
    this.state = 1;
    this.notify();

    return this.state;
  }
}
