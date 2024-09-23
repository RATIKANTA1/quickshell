import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskBoard from "./TaskBoard";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

function App() {
  const [tasks, setTasks] = useState([]);
  const [groupBy, setGroupBy] = useState("user");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orderPriority, setOrderPriority] = useState("None");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        const fetchedTasks = Array.isArray(response.data) ? response.data : [];
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Kanban Board</h1>
      <div>
        <label>Group by: </label>
        <select onChange={(e) => setGroupBy(e.target.value)}>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div>
        <label>Status: </label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      <div>
        <label>Order by Priority: </label>
        <select onChange={(e) => setOrderPriority(e.target.value)}>
          <option value="None">None</option>
          <option value="High to Low">High to Low</option>
          <option value="Low to High">Low to High</option>
        </select>
      </div>
      <TaskBoard tasks={tasks} groupBy={groupBy} statusFilter={statusFilter} orderPriority={orderPriority} />
    </div>
  );
}

export default App;
