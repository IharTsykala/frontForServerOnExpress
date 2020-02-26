import React from 'react'
import { connect } from 'react-redux'
import {addTodoAction} from "../store/todos/todos.actions";
//создаём функцию, которая возращает реактовский компонент
// PS для примера не описаны типы пропсов данной функции.
// Где-то в другом месте приложения всё чётко описано (имею ввиду дженерик)
const AddTodo: React.FC<any>= ({ dispatch }) => {
    let input: HTMLInputElement;

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return
                }
                dispatch(addTodoAction(input.value));
                input.value = ''
            }}>
                <input ref={node => {
                    if (node) {
                        input = node
                    }
                }} />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
};

// Коннектим к компоненту стор (именно поэтому у этого компонента в пропсах появляется dispatch функция)
// и экспортим из файлика компонент с уже подключённым стором
export default connect()(AddTodo);
