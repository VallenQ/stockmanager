import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Recover(){
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    setMessage(null);
    setErr(null);
    try{
      const { data } = await API.post('/auth/recover', { email, newPassword });
      setMessage(data.message || 'Senha alterada com sucesso.');
      // opcional: redirecionar após 2s
      setTimeout(()=>navigate('/login'), 1500);
    } catch(error){
      setErr(error.response?.data?.error || 'Erro ao recuperar senha');
    }
  }

  return (
    <div className="page card">
      <h2>Recuperar senha</h2>
      {message && <div className="success">{message}</div>}
      {err && <div className="alert">{err}</div>}
      <form onSubmit={submit}>
        <label>Email cadastrado</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Nova senha</label>
        <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
        <button className="btn-primary" type="submit">Alterar senha</button>
      </form>
    </div>
  );
}
