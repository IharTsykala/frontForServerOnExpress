import { Actions} from "./todos.actions";
import {TodoInterface} from "../../interfaces/todo.interface";
import * as R from 'ramda';
import {Action} from "../interfaces/action.interface";

//Прописыаем интерфейс для раздела стора
export interface State {
    todoList: TodoInterface[]
}
// задаём какие-либо инит значения в соответсвии с интерфейсом (для первого запуска)
const initialState: State = {
    todoList: []
};

// Описываем редьюсер (то как мы будем менять стэйт)
export const reducer = (state: State = initialState, action: Action<any>) => {
    switch (action.type) {
        case Actions.ADD_TODO:
            return {
                ...state,
                todoList: state.todoList.concat(action.payload)
            };
        case Actions.UPDATE_TODO:
            const todoIndex = state.todoList.findIndex((todo: TodoInterface) => todo.id === action.payload.id);
            const newTodoList = R.clone(state.todoList);
            newTodoList[todoIndex].text = action.payload.text;
            return {
                ...state,
                ...newTodoList
            };
        case Actions.DELETE_TODO:
            return {
                ...state,
                todoList: state.todoList.filter((todo: TodoInterface) => todo.id !== action.payload.id)
            };
        case Actions.TOGGLE_TODO:
            const toggledTodoIndex = state.todoList.findIndex((todo: TodoInterface) => todo.id === action.payload);
            const newToggledTodoList = R.clone(state.todoList);
            newToggledTodoList[toggledTodoIndex].completed = !newToggledTodoList[toggledTodoIndex].completed;
            return {
                ...state,
                todoList: newToggledTodoList
            };
            // case Actions.USER_LOGIN:
                
            //     return {
            //         ...state,
            //         user: ...userLogin
            //     };    
        default:
            return state
    }
};
