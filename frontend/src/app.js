import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const API_URL = "http://localhost:5000/tasks";

  async function fetchTasks() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  }

  async function addTask() {
    if (!text.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    setText("");
    fetchTasks();
  }

  async function toggleDone(id) {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTasks();
  }

  async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  }

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="container">
      <h2>React To-Do App</h2>

      <input value={text} 
             onChange={e => setText(e.target.value)} 
             placeholder="Enter task..." />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span className={t.done ? "done" : ""}
                  onClick={() => toggleDone(t.id)}>
              {t.text}
            </span>
            <button onClick={() => deleteTask(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
