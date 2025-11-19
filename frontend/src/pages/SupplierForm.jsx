import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function SupplierForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', contact:'', email:'' });

  useEffect(()=>{
    if (id) API.get(`/suppliers/${id}`).then(r=>setForm(r.data));
  }, [id]);

  async function submit(e){
    e.preventDefault();
    try{
      if (id) await API.put(`/suppliers/${id}`, form);
      else await API.post('/suppliers', form);
      navigate('/suppliers');
    } catch(err) { alert(err.response?.data?.error || 'Erro'); }
  }

  return (
    <div className="page card">
      <h2>{id ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h2>
      <form onSubmit={submit}>
        <label>Nome</label>
        <input value={form.name || ''} onChange={e=>setForm({...form, name:e.target.value})} />
        <label>Contato</label>
        <input value={form.contact || ''} onChange={e=>setForm({...form, contact:e.target.value})} />
        <label>Email</label>
        <input value={form.email || ''} onChange={e=>setForm({...form, email:e.target.value})} />
        <button className="btn-primary" type="submit">Salvar</button>
      </form>
    </div>
  );
}
