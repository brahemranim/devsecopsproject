import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Paper sx={{ maxWidth: 480, margin: '24px auto', padding: 3 }}>
      <Typography variant="h5" mb={2}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" fullWidth value={name} onChange={e=>setName(e.target.value)} margin="normal" />
        <TextField label="Email" fullWidth value={email} onChange={e=>setEmail(e.target.value)} margin="normal" />
        <TextField label="Password" type="password" fullWidth value={password} onChange={e=>setPassword(e.target.value)} margin="normal" />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit" sx={{ mt:2 }}>Register</Button>
      </form>
    </Paper>
  );
}
