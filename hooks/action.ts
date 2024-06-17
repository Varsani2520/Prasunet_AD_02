import { ADD_TODO, MARK_AS_COMPLETED, UPDATE_TODO, Todo, TodoAction, CANCEL_TODO } from './types';

export const addTodo = (todo: Todo): TodoAction => ({
  type: ADD_TODO,
  payload: todo,
});

export const markAsCompleted = (id: string): TodoAction => ({
  type: MARK_AS_COMPLETED,
  payload: { id },
});

export const updateTodo = (todo: Todo): TodoAction => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const cancelTodo = (id: string): TodoAction => ({
  type: CANCEL_TODO,
  payload: { id },
});
