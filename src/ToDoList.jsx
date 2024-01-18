import { ToDoItem } from "./ToDoItem";

export function ToDoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="list">
      {
        todos.length === 0 &&
          "No Todos" /*short circuit to check if there are no todos, if so, displays it*/
      }
      {todos.map((todo) => {
        /*returning an array inside of react requires a unique key element, 
      dont want to use index bc elements can be deleted*/
        return (
          <ToDoItem
            {...todo} //passes all the props as commented below
            /*id={todo.id}
            completed={todo.completed}
            title={todo.title}*/
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
}
