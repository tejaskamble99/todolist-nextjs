import React, {  useState } from 'react'


const Base = () => {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [mainTasks, setMainTasks] = useState([]);
  
    const submitHandeler = (e) => {
      e.preventDefault();
      setMainTasks([...mainTasks, { task, description }]);
      setTask("");
      setDescription("");
      console.log(mainTasks);
    };
  
  const deleteHandeler = (i) => {
  let copyTasks = [...mainTasks];
  copyTasks.splice(i, 1);
  setMainTasks(copyTasks);
  
  }
  
    let rederTasks = <h2>No Tasks Available</h2>;
    if (mainTasks.length > 0) {
      rederTasks = mainTasks.map((t, i) => {
        return (
          <li key={i} className="flex items-center mb-8 justify-between">
            <div className="flex justify-between w-1/2">
              <h1 className="text-2xl font-semibold">{t.task}</h1>
              <h1 className="text-xl font-medium">{t.description}</h1>
            </div>
            <button 
            onClick={deleteHandeler}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-2xl">
              Delete
            </button>
          </li>
        );
      });
    }


  return (
    <>
    <h1 className="text-5xl font-bold text-white text-center bg-black p-5">
        Todo List
      </h1>
      <form onSubmit={submitHandeler}>
        <input
          type="text"
          className="  text-2xl  border-zinc-900 border-4 m-5 px-4 py-2"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          className="  text-2xl  border-zinc-900 border-4 m-5 px-4 py-2"
          placeholder="Enter a Decription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl"
        >
          Add Task
        </button>
      </form>

      <hr />
      <div className="p-5  bg-slate-200">
        <ul>{rederTasks}</ul>
      </div>
      </>

  )
}

export default Base
