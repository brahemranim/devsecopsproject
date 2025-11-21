import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, List, ListItem, IconButton, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api/axios';

export default function Dashboard(){
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    if (editingId) {
      await api.put(`/tasks/${editingId}`, { title });
      setEditingId(null);
    } else {
      await api.post('/tasks', { title });
    }
    setTitle('');
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(t => t.filter(x => x._id !== id));
  };

  const handleToggle = async (task) => {
    await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    setTasks(t => t.map(x => x._id === task._id ? { ...x, completed: !x.completed } : x));
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
  };

  return (
    <Paper sx={{ maxWidth: 800, margin: '16px auto', padding:3 }}>
      <Typography variant="h6" mb={2}>Your Tasks</Typography>
      <div style={{ display:'flex', gap: 8, marginBottom: 12 }}>
        <TextField fullWidth value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task title" />
        <Button variant="contained" onClick={handleAdd}>{editingId ? 'Save' : 'Add'}</Button>
      </div>
      <List>
        {tasks.map(task => (
          <ListItem key={task._id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => startEdit(task)} aria-label="edit"><EditIcon /></IconButton>
              <IconButton edge="end" onClick={() => handleDelete(task._id)} aria-label="delete"><DeleteIcon /></IconButton>
            </>
          }>
            <Checkbox checked={task.completed} onChange={()=>handleToggle(task)} />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
