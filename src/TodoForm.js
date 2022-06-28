import { useStore } from "./Store";
import { useState } from "react";

export default function TodoForm() {
  const [userInput, setUserInput] = useState("");
  const add = useStore((state) => state.add);
  const filter = useStore((state) => state.filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput !== "" && userInput !== null) {
      add(userInput);
      setUserInput("");
    } else {
      alert("Please Enter Task Input");
    }
  };

  return (
    <div>
    <h1>Todo Tasks: {filter}</h1>
    <form onSubmit={handleSubmit}>
      <input
        value={userInput}
        type="text"
        placeholder="Add New Task"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button>Add Todo</button>
    </form>
    </div>
  );
}
