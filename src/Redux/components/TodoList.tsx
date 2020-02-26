import React from 'react'
import Todo from './Todo'
import {TodoInterface} from "../interfaces/todo.interface";

// Интерфейс пропсов TodoList компонента
interface Props {
    //Описывам, что приходит массив из тудушек
    todos: TodoInterface[],
    //Описываем, что приходит фукция, которая принимает число и ничего не возвращает
    toggleTodo: (todoId: number) => void;
}

const TodoList = ({todos, toggleTodo}: Props) => (
    <ul>
        {todos.map((todo: TodoInterface) =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => toggleTodo(todo.id)}
            />
        )}
    </ul>
);

export default TodoList;
