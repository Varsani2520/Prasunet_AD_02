export const ADD_TODO = 'ADD_TODO';
export const MARK_AS_COMPLETED = 'MARK_AS_COMPLETED';
export const UPDATE_TODO = 'UPDATE_TODO';

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

export type TodoAction = AddTodoAction | MarkAsCompletedAction | UpdateTodoAction;

export type RootState = {
  todos: {
    todos: Todo[];
    completedTodos: Todo[];
  };
};
