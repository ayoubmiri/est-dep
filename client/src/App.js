import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [taskToEdit, setTaskToEdit] = useState(null);

  return (
    <div className="container">
      <h1>Gestionnaire de Tâches</h1>
      <TaskForm
        taskToEdit={taskToEdit}
        onTaskSubmitted={() => {
          setTaskToEdit(null);
          setRefreshKey(prev => prev + 1);
        }}
      />
      <TaskList 
        onTaskUpdated={refreshKey}
        onEditTask={setTaskToEdit}
      />
    </div>
  );
}

export default App;