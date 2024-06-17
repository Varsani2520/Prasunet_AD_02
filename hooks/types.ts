// types.ts
export const ADD_TODO = 'ADD_TODO';
export const MARK_AS_COMPLETED = 'MARK_AS_COMPLETED';
export const UPDATE_TODO = 'UPDATE_TODO';
export const CANCEL_TODO = 'CANCEL_TODO'; // Add this line

export type Todo = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  timing: string;
  backgroundColor: string;
  completed: boolean;
};

export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

export interface MarkAsCompletedAction {
  type: typeof MARK_AS_COMPLETED;
  payload: { id: string };
}

export interface UpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: Todo;
}

export interface CancelTodoAction { // Add this interface
  type: typeof CANCEL_TODO;
  payload: { id: string };
}

export type TodoAction = AddTodoAction | MarkAsCompletedAction | UpdateTodoAction | CancelTodoAction;

export type RootState = {
  todos: {
    todos: Todo[];
    completedTodos: Todo[];
    canceledTodos: Todo[]; // Add this line
    count: number;
  };
};
