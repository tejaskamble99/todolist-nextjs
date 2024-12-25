"use client";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [mainTasks, setMainTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() === "") return; // Prevent adding empty tasks
    const newTask = {
      id: Date.now(),
      task,
      description,
      timestamp: new Date().toLocaleString(),
    };
    setMainTasks([...mainTasks, newTask]);
    setTask("");
    setDescription("");
  };

  const deleteTask = (id) => {
    setMainTasks(mainTasks.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setMainTasks(JSON.parse(storedTasks));
    }
   }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(mainTasks));
   }, [mainTasks]);

  return (
    <>
      <h1 className="text-5xl font-bold text-white text-center bg-black p-5">
        To-Do Lists
      </h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-4 mt-5"
      >
        <input
          type="text"
          className="text-xl border-zinc-900 border-2 rounded-lg p-3 w-3/4"
          placeholder="Enter a task title"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <textarea
          className="text-xl border-zinc-900 border-2 rounded-lg p-3 w-3/4"
          placeholder="Enter task details"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg text-xl"
        >
          Add Note
        </button>
      </form>

      <div className="p-5 bg-gray-100">
        {mainTasks.length === 0 ? (
          <h2 className="text-center text-2xl font-semibold text-gray-500">
            No Notes Available
          </h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {mainTasks.map((t) => (
              <div
                key={t.id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-300 relative"
              >
                <button
                  onClick={() => deleteTask(t.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
                >
                  ✕
                </button>
                <h2 className="text-xl font-bold mb-2">{t.task}</h2>
                <p className="text-gray-700">{t.description}</p>
                <p className="text-sm text-gray-400 mt-4">
                  Created: {t.timestamp}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
