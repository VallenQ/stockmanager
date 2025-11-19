import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function Suppliers(){
  const [suppliers,setSuppliers]=useState([]);

  async function load(){
    const { data } = await API.get('/suppliers');
    setSuppliers(data);
  }

  useEffect(()=>{ load(); }, []);

  async function remove(id){
    if(!confirm('Excluir fornecedor?')) return;
    try{
      await API.delete(`/suppliers/${id}`);
      load();
    } catch(err) {
      alert(err.response?.data?.error || 'Erro ao excluir');
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>Fornecedores</h2>
        <Link to="/suppliers/new" className="btn-primary">Novo fornecedor</Link>
      </div>

      <table className="table">
        <thead><tr><th>Nome</th><th>Contato</th><th>Email</th><th>Ações</th></tr></thead>
        <tbody>
          {suppliers.map(s=>(
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.contact}</td>
              <td>{s.email}</td>
              <td>
                <Link to={`/suppliers/edit/${s.id}`} className="btn-ghost">Editar</Link>
                <button className="btn-danger" onClick={()=>remove(s.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
