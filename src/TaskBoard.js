import React, { useState } from "react";

const TaskBoard = ({ tasks, groupBy, statusFilter, orderPriority }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  // Group tasks either by user or priority
  const groupTasks = (tasks) => {
    if (!Array.isArray(tasks)) {
      return {};
    }
    if (groupBy === "user") {
      return tasks.reduce((acc, task) => {
        (acc[task.user] = acc[task.user] || []).push(task);
        return acc;
      }, {});
    } else if (groupBy === "priority") {
      return tasks.reduce((acc, task) => {
        (acc[task.priority] = acc[task.priority] || []).push(task);
        return acc;
      }, {});
    }
  };

  // Filter tasks by status
  const filterTasks = (tasks) => {
    return tasks.filter(task => statusFilter === "All" || task.status === statusFilter);
  };

  // Sort tasks by priority
  const sortTasks = (tasks) => {
    if (orderPriority === "High to Low") {
      return tasks.sort((a, b) => b.priority - a.priority);
    } else if (orderPriority === "Low to High") {
      return tasks.sort((a, b) => a.priority - b.priority);
    }
    return tasks;
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = (group) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === draggedTask.id) {
        return { ...task, [groupBy]: group }; // Update task's user or priority
      }
      return task;
    });
    setDraggedTask(null);
  };

  const groupedTasks = groupTasks(filterTasks(sortTasks(tasks)));

  return (
    <div className="task-board">
      {Object.keys(groupedTasks).map((group) => (
        <div
          key={group}
          className="task-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(group)}
        >
          <h2>{group}</h2>
          {groupedTasks[group].map((task) => (
            <div
              key={task.id}
              className="task-card"
              draggable
              onDragStart={() => handleDragStart(task)}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
