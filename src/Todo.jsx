import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Todo.css'

export default function Todo() {

    let[todo, setTodo] = useState([])
    let[newTodo, setnewTodo] = useState("")

    function updateTodo(event) {
        event.preventDefault();
        if (newTodo.trim() === "") return; 

        setTodo((prev) => [
        ...prev,
        { task: newTodo, id: uuidv4(), isDone: false },
        ]);

        setnewTodo("");
    }

    function text(event) {
        setnewTodo(event.target.value);
    }

    function deleteTodo(id) {
        setTodo((prevtodos) => prevtodos.filter((prevtodo) => prevtodo.id != id));
    }

    function updateOne(id) {
        setTodo((prevtodos) =>
            prevtodos.map((t) => {
                if (t.id === id) {
                    return {
                        ...t,
                        task: t.task.toUpperCase()
                    };
                } else {
                    return t;
                }
            })
        );
    }

    function updateAll() {
    setTodo((prevtodos) => 
        prevtodos.map((t) => {
            return {
                ...t,
                task: t.task.toUpperCase()
            };
        })
      );
    }

    function taskDone(id) {
        setTodo((prevTodo) => 
            prevTodo.map((t) => {
                    if(t.id == id) {
                        return {
                            ...t,
                            isDone : true  
                        }
                    } 
                    return t;
                })
        );
    }

    return (
        <div className="todo-container"> 
            <h3>To-do Lists</h3>
            <form className="todo-form">
            <input type="text" placeholder="enter task" onChange={text}/>
            <button onClick={updateTodo}>add</button>
            </form>

            <ul className="todo-list">
                {todo.map((td) => {
                   return (
                  <li key = {td.id}>
                        <span style={{ textDecoration: td.isDone ? "line-through" : "none" }}>{td.task}</span>
                        <div className="btn-group">
                        <button onClick={() => { deleteTodo(td.id) }}>Delete</button>
                        <button onClick={() => { updateOne(td.id) }}>Update</button>
                        <button onClick={() => { taskDone(td.id) }}>Marks as done</button>
                        </div>
                   </li>);
                })}
            </ul>

            <button onClick={updateAll}>UpdateAll</button>
        </div>
    );
}