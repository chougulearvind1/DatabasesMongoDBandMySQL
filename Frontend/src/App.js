import React, { useEffect,useState } from 'react'

function App() {
  const [Task, setTask] = useState('');
  const [Tasks, setTasks] = useState([])
  useEffect(() => {
     fetch('http://localhost:5000/tasks',{Headers:'Application/json'})
     .then(response => response.json())
     .then(data => setTasks(data))

  }, [])
  const AddTask = () => {
    fetch('http://localhost:5000/tasks',
        {method:'POST',headers:{'content-type':'application/json'},
        body:JSON.stringify({Task})    
    }).then(response => response.json())
    .then(() => { setTasks([...Tasks,Task]); setTask('') } )
  }

  return (
    <div style={{ backgroundColor: 'orange', width: '80%', position: 'absolute', left: '10%', top: '10%' }}>
  <div style={{ textAlign: 'center' }}>
    <h1 style={{ color: 'white', fontSize: 'xxx-large' }}>To Do List App</h1>
    <div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'baseline' }}>
        <label htmlFor="ToDoInput" style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px', display: 'block' }}>
          Enter the Task:
        </label>
        
        <input
          type="text"
          name="ToDoInput"
          id="ToDoInput"
          onChange={(e) => { setTask(e.currentTarget.value) }}
          value={Task}
          style={{ padding: '10px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px', width: '50%' }}
        />
        
        <button
          type="button"
          id="AddTaskBtn"
          onClick={AddTask}  
          style={{ backgroundColor: 'green', color: 'white', padding: '10px', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
        >
          Add Task
        </button>        
      </div>
    </div>
  </div>
  
  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
    <ul id="TaskList" style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center' }}>
      {Tasks && Tasks.map((element, index) => (
        <li
          key={index}
          style={{
            padding: '5px',
            backgroundColor: 'white',
            marginBottom: '3px',
            display: 'block',
            borderRadius: '5px',
            width: '50%',
            textAlign: 'center',
            fontFamily: 'cursive'
          }}
        >
          {element}
        </li>
      ))}
    </ul>
  </div>
</div>
  )
}

export default App