import React, { useState } from 'react';
import { taskService } from '../services/api';

export default function TaskForm({ taskToEdit, onTaskSubmitted }) {
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        await taskService.updateTask(taskToEdit.id, { title });
      } else {
        await taskService.createTask({ title });
      }
      setTitle('');
      onTaskSubmitted();
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="task-form">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez une tâche"
            required
          />
        </div>
        <button type="submit" className="btn">
          {taskToEdit ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}