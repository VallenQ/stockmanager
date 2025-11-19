import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ sku:'', name:'', description:'', price:0, stock:0, supplierId: '' });

  useEffect(()=>{
    API.get('/suppliers').then(r=>setSuppliers(r.data));
    if(id){
      API.get(`/products/${id}`).then(r=>setForm(r.data));
    }
  }, [id]);

  async function submit(e){
    e.preventDefault();
    try{
      if (id) await API.put(`/products/${id}`, form);
      else await API.post('/products', form);
      navigate('/products');
    } catch(err) { alert(err.response?.data?.error || 'Erro'); }
  }

  return (
    <div className="page card">
      <h2>{id ? 'Editar Produto' : 'Novo Produto'}</h2>
      <form onSubmit={submit}>
        <label>SKU</label>
        <input value={form.sku || ''} onChange={e=>setForm({...form, sku: e.target.value})} />
        <label>Nome</label>
        <input value={form.name || ''} onChange={e=>setForm({...form, name: e.target.value})} />
        <label>Descrição</label>
        <textarea value={form.description || ''} onChange={e=>setForm({...form, description: e.target.value})} />
        <label>Preço</label>
        <input type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
        <label>Estoque</label>
        <input type="number" value={form.stock} onChange={e=>setForm({...form, stock: e.target.value})} />
        <label>Fornecedor</label>
        <select value={form.supplierId || ''} onChange={e=>setForm({...form, supplierId: e.target.value})}>
          <option value="">-- selecione --</option>
          {suppliers.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <button className="btn-primary" type="submit">Salvar</button>
      </form>
    </div>
  );
}
