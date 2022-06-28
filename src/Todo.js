import "./styles.css";
import { useStore } from "./Store";
import { useState } from "react";

export default function Todo() {
    const [userEditInput, setUserEditInput] = useState("");
    const [filter, setFilter] = useState("All");
    const todoList = useStore((state) => state.todos);
    const isEdited = useStore((state) => state.notEdited);
    const editButtonId = useStore((state) => state.editButtonId);

    const deleted = useStore((state) => state.remove);
    const editToggle = useStore((state) => state.edited);
    const completeToggle = useStore((state) => state.completed);
    const edit = useStore((state) => state.edit);
    const setEditButtonId = useStore((state) => state.setEditButtonId);
    const setFilterSelection = useStore((state) => state.setFilterSelection);
    
 
    const getFilteredTodoList = (todos, filter) => {
        setFilterSelection(filter);
        return todos.filter((todo) => {
        if (filter === "Completed") {
            return todo.complete;
        } else if (filter === "Active") {
            return !todo.complete;
        } else {
            return todo;
        }
        });
    };

    const handleEditTask = (e) => {
        e.preventDefault();
        if (userEditInput !== "" && userEditInput !== null) {
          edit(editButtonId, userEditInput);
          setUserEditInput("");
          editToggle(true);
          console.log(editButtonId)
        } else {
          alert("Please Enter Task Input");
        }
      };


    const handleClick = (e) => {
        e.preventDefault();
        completeToggle(e.target.id);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleted(e.target.id);
      };    

    const handleEditButton = (e) => {
        e.preventDefault();
        editToggle(isEdited);
        setEditButtonId(e.target.id)
    };

  return (
    <div>
    {
    getFilteredTodoList(todoList, filter).map((todo) => {
        return(
        <div>
        <li
          id={todo.id}
          key={todo.id + todo.task}
          name="todo"
          value={todo.id}
          onClick={handleClick}
          className={todo.complete ? "todo strike" : "todo"}
        >
          {todo.task}
        </li>
        <button id={todo.id} onClick={handleDelete}>
          Delete
        </button>
        <button id={todo.id} onClick={handleEditButton}>
          Edit
        </button>
        </div>
    )})} 
    {
        isEdited ? (
        <form onSubmit={handleEditTask}>
            <input
                value={userEditInput}
                type="text"
                placeholder="Edit You Task"
                onChange={(e) => setUserEditInput(e.target.value)}
            />
            <button id={editButtonId}>Edit</button>
            </form>
        ) : (
            <></>
        )}
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("All")}>All</button>
        </div>
    );
}




 
 