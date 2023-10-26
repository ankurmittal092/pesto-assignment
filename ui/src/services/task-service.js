import React, { useEffect, useState } from "react";

export const useTasksService = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    const response = await fetch("http://localhost:3002/tasks");
    const data = await response.json();
    setTasks(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getTasks();
  }, []);

  return {
    tasks,
    loading,
  };
};

export const addTask = async (payload) => {
  debugger;
  try {
    const response = await fetch("http://localhost:3002/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id, payload) => {
  debugger;
  try {
    const response = await fetch(`http://localhost:3002/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  debugger;
  try {
    const response = await fetch(`http://localhost:3002/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
