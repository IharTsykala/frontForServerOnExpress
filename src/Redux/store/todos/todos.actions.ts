import {TodoInterface} from "../../interfaces/todo.interface";
import {Action} from "../interfaces/action.interface";

// Для удобства создаём список экшенов (именно их строковых типов)
export const Actions = {
    ADD_TODO: '[todo] Add todo',
    UPDATE_TODO: '[todo] Update todo',
    DELETE_TODO: '[todo] Delete todo',
    TOGGLE_TODO: '[todo] Toggle todo',
    USER_LOGIN: '[my aplication] User login'
};

// Создаём генераторы экшенов - функции, которые будут возвращать объекты с полями type и payload
// (в данном примере так сделал, так как в принципе неплохая практика следовать такому интерфейсу)
// можно глянуть реализацию самого интерфейса
// В пэйлоад бросаем тот тип данных, который указан у экшена в дженерике (повторю: реализация может быть разная, предлагаю к рассмотрению данную)
export const addTodoAction = (text: string): Action<TodoInterface> => ({
    type: Actions.ADD_TODO,
    payload: {
        id: (new Date()).getTime(),
        text
    },

});

export const updateTodoAction = (id: number, text: string): Action<TodoInterface> => ({
    type: Actions.ADD_TODO,
    payload: {
        id,
        text
    },
});

export const deleteTodoAction = (id: number): Action<number> => ({
    type: Actions.ADD_TODO,
    payload: id,
});

export const toggleTodoAction = (id: number): Action<number> => ({
    type: Actions.TOGGLE_TODO,
    payload: id,
});

// export const userLogIn = (id: number): Action<number> => ({
//     type: Actions.USER_LOGIN,
//     payload: user,
// });
