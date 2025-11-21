import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/RequireAuth';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useAuth } from './context/AuthContext';

export default function App(){
  const { user, logout } = useAuth();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow:1 }}>
            ToDo App
          </Typography>
          {user ? (
            <>
              <Typography variant="body1" sx={{ mr:2 }}>{user.name}</Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <main className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
        </Routes>
      </main>
    </div>
  );
}
