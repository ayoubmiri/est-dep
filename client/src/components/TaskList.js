import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

export default function TaskList({ onTaskUpdated }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Erreur lors du chargement des tâches');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [onTaskUpdated]);

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  return (
    <div className="task-list">
      {error && <div className="error-message">{error}</div>}
      {tasks.length === 0 ? (
        <p>Aucune tâche pour le moment</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                <span className={task.completed ? 'task-completed' : 'task-pending'}>
                  {task.completed ? 'Complétée' : 'En attente'}
                </span>
              </div>
              <div className="actions">
                <button 
                  onClick={() => handleDelete(task.id)} 
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}