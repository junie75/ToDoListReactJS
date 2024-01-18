import { useState } from "react";

export function NewTodoForm({ onSubmit }) {
  //state variable and function for when a new item is added to the list
  const [newItem, setNewItem] = useState(""); //calling useState rerenders the application

  //event handler for when user clicks add
  function handleSubmit(e) {
    //stops page from refreshing
    e.preventDefault();

    //verifies that the new item has a value before calling onSubmit (addTodo)
    if (newItem === "") return;
    onSubmit(newItem);

    setNewItem(""); //resets input box when item is added
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          /*function allows input box to be updated with user input*/ type="text"
          id="item"
        />
      </div>

      <button className="btn">Add</button>
    </form>
  );
}
