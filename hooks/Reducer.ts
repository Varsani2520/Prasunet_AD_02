import { ADD_TODO, MARK_AS_COMPLETED, UPDATE_TODO, Todo, TodoAction } from './types';

interface State {
  todos: Todo[];
  completedTodos: Todo[];
}

const initialState: State = {
  todos: [],
  completedTodos: [],
};

const todoReducer = (state: State = initialState, action: TodoAction): State => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case MARK_AS_COMPLETED:
      const { id } = action.payload;
      const todoToMove = state.todos.find(todo => todo.id === id);
      if (todoToMove) {
        const updatedTodos = state.todos.filter(todo => todo.id !== id);
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
    default:
      return state;
  }
};

export default todoReducer;
