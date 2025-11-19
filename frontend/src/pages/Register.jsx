import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState(null);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      await API.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch(err) {
      setErr(err.response?.data?.error || 'Erro ao registrar');
    }
  }

  return (
    <div className="page card">
      <h2>Registrar</h2>
      {err && <div className="alert">{err}</div>}
      <form onSubmit={submit}>
        <label>Nome</label>
        <input value={name} onChange={e=>setName(e.target.value)} />
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Senha (mín 3 chars para dev)</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn-primary" type="submit">Criar conta</button>
      </form>
    </div>
  );
}
