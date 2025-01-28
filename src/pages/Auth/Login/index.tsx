/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/Login.tsx
import React, { useState, FormEvent } from 'react';
import { TextField, Button, Container, Box, Snackbar, CircularProgress, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin'); // Redireciona para a página Admin após login
    } catch (err) {
      setError('Falha ao fazer login. Verifique suas credenciais!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        padding: 2,
        borderRadius: 2,
        minHeight: '100vh', // Garante que ocupe toda a altura da tela
        display: 'flex',
        justifyContent: 'center', // Centraliza horizontalmente
        alignItems: 'center', // Centraliza verticalmente
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, marginBottom: 2 }}>
          Bem-vindo de volta!
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ backgroundColor: '#f1f1f1', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ backgroundColor: '#f1f1f1', borderRadius: 1 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              padding: '12px 0',
              fontSize: '16px',
              borderRadius: '8px',
              background: '#3c3c3c',
              color: '#fff',
              '&:hover': { background: '#000000', color: '#fff' },
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
          </Button>
        </form>

        {error && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            message={error}
            onClose={() => setError(null)}
            sx={{
              backgroundColor: '#ff4d4d',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 1,
              padding: 1,
            }}
          />
        )}
      </Box>
    </Container>
  );
};

export default Login;
