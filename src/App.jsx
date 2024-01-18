import { useState, useEffect } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { ToDoList } from "./ToDoList";

export default function App() {
  //state varable array todos and function to set the array
  const [todos, setTodos] = useState(() => {
    //gets the json version of our todos from local storage
    const localValue = localStorage.getItem("ITEMS");
    //checks if we have any todos in local storage, if not return an empty array as default value
    if (localValue === null) return [];
    //else parse the JSON and return the todo as the default value
    return JSON.parse(localValue);
  });

  useEffect(() => {
    //every time 'todos' changes, store todos inside of local storage
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    //passed function to function setTodos that changes the value of currentTodos
    setTodos((currentTodos) => {
      //returns array with all previous values plus new value as the new state
      return [
        ...currentTodos, //rather than using for statement to get every element, uses spread syntax
        {
          id: crypto.randomUUID(),
          title: title,
          completed: false,
        } /*append value onto the end of the array with a unique id, the user input as the title, and the value for
        the checkbox defaulted to false*/,
      ];
    });
  }

  //handles when todo is toggled, takes in id of todo item plus e.target.checked
  function toggleTodo(id, completed) {
    //calls setTodos and changes the value of currentTodos to the same array except the item that was toggled is set to checked
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        //for each item in todo array, checks if it is the item we are looking for, if true, modifies object by just adding a new completed value
        if (todo.id === id) {
          return { ...todo, completed };
        }

        //if not what we are looking for, return todo item as is
        return todo;
      });
    });
  }

  //handles when delete button is pressed
  function deleteTodo(id) {
    //calls setTodos and returns the same array except for the todo item being deleted
    setTodos((currentTodos) => {
      //if todo id is not equal to id -> keep it, otherwise -> remove it.
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
