import React from 'react'
import AddTodo from "./containers/AddTodo";
import VisibleTodoList from "./containers/VisibleTodoList";

const ReduxPage = () => (
    <div>
        <AddTodo />
        <VisibleTodoList/>
    </div>
)

export default ReduxPage
