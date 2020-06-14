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
