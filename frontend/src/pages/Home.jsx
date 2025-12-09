import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    API.get('/products')
      .then(r=>setProducts(r.data))
      .catch(()=>setProducts([]));
  }, []);

  return (
    <div className="page">
      <h1>Produtos Cadastrados</h1>
      {products.length === 0 && <p>Não há produtos cadastrados.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
        {products.map(p => (
          <div key={p.id} className="card" style={{ padding: 12 }}>
            <div style={{ height: 140, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              {p.imageLink ? (
                <a href={p.imageLink} target="_blank" rel="noreferrer">
                  <img src={p.imageLink} alt={p.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </a>
              ) : (
                <div style={{ color:'#777' }}>Sem imagem</div>
              )}
            </div>
            <h3 style={{ marginTop: 8 }}>{p.name}</h3>
            <p style={{ margin: 0 }}>{p.sku}</p>
            <p style={{ margin: 0 }}>Estoque: {p.stock}</p>
            <p style={{ margin: '8px 0 0 0' }}>R$ {Number(p.price).toFixed(2)}</p>
            <Link to={`/products/${p.id}`} style={{ display:'inline-block', marginTop: 8 }}>Ver / Editar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
