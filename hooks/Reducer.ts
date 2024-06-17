import { ADD_TODO, MARK_AS_COMPLETED, UPDATE_TODO, CANCEL_TODO, Todo, TodoAction } from './types';

interface State {
  todos: Todo[];
  completedTodos: Todo[];
  canceledTodos: Todo[];
  count: number;
}

const initialState: State = {
  todos: [],
  completedTodos: [],
  canceledTodos: [],
  count: 0,
};

const todoReducer = (state: State = initialState, action: TodoAction): State => {
  

  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        count: state.count + 1,
      };
    case MARK_AS_COMPLETED:
      const { id: completedId } = action.payload;
      const todoToMove = state.todos.find(todo => todo.id === completedId);

      if (todoToMove) {
        const updatedTodos = state.todos.filter(todo => todo.id !== completedId);
        return {
          ...state,
          todos: updatedTodos,
          completedTodos: [...state.completedTodos, { ...todoToMove, progress: 100 }],
        };
      }
      return state;
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo),
      };
    case CANCEL_TODO:
      const { id: canceledId } = action.payload;
      const canceledTodo = state.todos.find(todo => todo.id === canceledId);


      if (canceledTodo) {
        const updatedTodos = state.todos.filter(todo => todo.id !== canceledId);
        return {
          ...state,
          todos: updatedTodos,
          canceledTodos: [...state.canceledTodos, canceledTodo],
        };
      }
      return state;
    default:
      return state;
  }
};

export default todoReducer;
