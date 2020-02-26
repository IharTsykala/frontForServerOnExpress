import {combineReducers} from 'redux';
import {reducer as todosReducer} from './todos/todos.reducers';

//Задаём базовую структуру стора, объединяем (здесь можем объединять) все редьюсеры, которые есть в приложении
export default combineReducers({
    todos: todosReducer
});
