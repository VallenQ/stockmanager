import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function Products(){
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);

  async function load(){
    try{
      const { data } = await API.get('/products');
      setProducts(data);
    } catch(err){
      console.error(err);
    } finally { setLoading(false); }
  }
  useEffect(()=>{ load(); }, []);

  async function remove(id){
    if(!confirm('Deseja excluir este produto?')) return;
    await API.delete(`/products/${id}`);
    load();
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>Produtos</h2>
        <Link to="/products/new" className="btn-primary">Novo produto</Link>
      </div>

      {loading ? <p>Carregando...</p> : (
        <table className="table">
          <thead><tr><th>SKU</th><th>Nome</th><th>Preço</th><th>Estoque</th><th>Fornecedor</th><th>Ações</th></tr></thead>
          <tbody>
            {products.map(p=>(
              <tr key={p.id}>
                <td>{p.sku}</td>
                <td>{p.name}</td>
                <td>R$ {Number(p.price).toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>{p.Supplier ? p.Supplier.name : '-'}</td>
                <td>
                  <Link to={`/products/edit/${p.id}`} className="btn-ghost">Editar</Link>
                  <button className="btn-danger" onClick={()=>remove(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
