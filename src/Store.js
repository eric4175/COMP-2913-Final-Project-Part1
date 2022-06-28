import create from "zustand";
import produce from "immer";
import data from "./data.json";

export const useStore = create((set) => ({
    todos: data,

    add: (task) =>
        set(
        produce((state) => {
            state.todos.push({
            id: state.todos.length + 1,
            task: task,
            complete: false
            });
        })
        ),

    completed: (id) =>
        set(
        produce((state) => {
            const index = state.todos.findIndex((todo) => todo.id === Number(id));
            if (index !== -1) {
                state.todos[index].complete = !state.todos[index].complete;
            }
        })
        ),    

    remove: (id) =>
        set(
        produce((state) => {
            const index = state.todos.findIndex((todo) => todo.id === Number(id));
            if (index !== -1) state.todos.splice(index, 1);
        })
        ),
    //https://immerjs.github.io/immer/update-patterns/

    edit: (id, task) =>
        set(
        produce((state) => {
            const index = state.todos.findIndex((todo) => todo.id === Number(id));
            if (index !== -1) {
                state.todos[index].task = task;
                state.todos[index].complete = false;
            }
        })
        ),

    notEdited: false,

    edited: () => set(
        produce((state) => {
        state.notEdited = !state.notEdited;
    })),

    editButtonId: 0,

    setEditButtonId: (id) => set(
        produce((state) => {
        state.editButtonId = Number(id)
    })),

    filter: "All",

    setFilterSelection: (filter) => set(
        produce((state) => {
        state.filter = String(filter)
    }))


}));