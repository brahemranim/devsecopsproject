import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Paper sx={{ maxWidth: 480, margin: '24px auto', padding: 3 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth value={email} onChange={e=>setEmail(e.target.value)} margin="normal" />
        <TextField label="Password" type="password" fullWidth value={password} onChange={e=>setPassword(e.target.value)} margin="normal" />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit" sx={{ mt:2 }}>Login</Button>
      </form>
    </Paper>
  );
}
