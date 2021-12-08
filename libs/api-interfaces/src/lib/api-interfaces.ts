export enum State {
  PENDING,
  DONE
}

export interface Todo {
  id?: number;
  title: string;
  description: string;
  state: State;
}

export interface Db {
  documents: Array<Todo>;
}
