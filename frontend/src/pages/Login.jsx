import React, { useState } from 'react';
import API from '../api/api';
import { saveToken } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState(null);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const { data } = await API.post('/auth/login', { email, password });
      saveToken(data.token);
      API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/dashboard');
    } catch(err) {
      setErr(err.response?.data?.error || 'Erro no login');
    }
  }

  return (
    <div className="page card">
      <h2>Entrar</h2>
      {err && <div className="alert">{err}</div>}
      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Senha</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn-primary" type="submit">Entrar</button>
      </form>

      <div style={{ marginTop: 12 }}>
        <Link to="/recover">Recuperar senha</Link>
      </div>
    </div>
  );
}
