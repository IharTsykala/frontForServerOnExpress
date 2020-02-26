import {State as TodosState} from '../todos/todos.reducers';

// Описал интерфейс для глобального стейта приложения для более удобной навигации
export interface RootState {
    todos: TodosState
}
