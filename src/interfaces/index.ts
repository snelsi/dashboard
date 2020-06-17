export interface IDesk {
  id: number;
  name: string;
  index: number;
}

export interface IGroup {
  id: number;
  name: string;
  index: number;
  desk_id: number;
  tasks: ITask[];
}

export interface ITask {
  id: number;
  description: string;
  index: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export type Status = "Planned" | "In Progress" | "Done" | "Failed";

export enum SystemRole {
  User = "User",
  Moderator = "Moderator",
  Admin = "Admin",
}

/**
 * Интферфейс издателя объявляет набор методов для управлениями подписчиками.
 */
export interface Subject {
  // Присоединяет наблюдателя к издателю.
  attach: (observer: Observer) => void;

  // Отсоединяет наблюдателя от издателя.
  detach: (observer: Observer) => void;

  // Уведомляет всех наблюдателей о событии.
  notify: () => void;
}

/**
 * Интерфейс Наблюдателя объявляет метод уведомления, который издатели
 * используют для оповещения своих подписчиков.
 */
export interface Observer {
  // Получить обновление от субъекта.
  update: (subject: Subject) => void;
}
