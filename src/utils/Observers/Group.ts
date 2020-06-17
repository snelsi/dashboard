import { Observer, Subject } from "interfaces";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Издатель владеет некоторым важным состоянием и оповещает наблюдателей о его
 * изменениях.
 */
export class GroupSubject implements Subject {
  /**
   * Состояние Издателя
   */
  private state = 1;

  /**
   *  Список подписчиков
   */
  private observers: Observer[] = [];

  public getState = () => this.state;

  /**
   * Методы управления подпиской.
   */
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

  /**
   * Запуск обновления в каждом подписчике.
   */
  public notify(): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public async update() {
    console.log("Group: Updating...");
    this.state = 2;
    this.notify();

    // simulate loading
    await delay(3000);

    console.log(`Group: Updated`);
    this.state = 1;
    this.notify();

    return this.state;
  }
}
