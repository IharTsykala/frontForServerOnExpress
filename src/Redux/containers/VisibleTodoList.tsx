import TodoList from "../components/TodoList";
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {toggleTodoAction} from "../store/todos/todos.actions";
import {RootState} from "../store/interfaces/RootState";

// Говорим, что нужно взять из стэйта поле state.todos.todoList и
// положить его в пропсы в поле todos компонента, который мы коннектим ниже
const mapStateToProps = (state: RootState) => ({
    todos: state.todos.todoList
});
// кладём в пропсы компонента функцию toggleTodo, котоаря будет выполнять dispatch(toggleTodoAction(id))
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    toggleTodo: (id: number) => dispatch(toggleTodoAction(id))
});

//Коннектим компонент к стору, передавая в него наши описанные ранее мапперы свойств
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)
