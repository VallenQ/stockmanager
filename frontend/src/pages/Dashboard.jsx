import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard(){
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const LOW_STOCK_THRESHOLD = 5;

  useEffect(()=>{
    async function load(){
      try{
        const [pRes, mRes] = await Promise.all([
          API.get('/products'),
          API.get('/products/movements?limit=10')
        ]);
        setProducts(pRes.data || []);
        setMovements(mRes.data || []);
      }catch(err){
        setProducts([]);
        setMovements([]);
      } finally { setLoading(false); }
    }
    load();
  }, []);

  const lowStock = products.filter(p => Number(p.stock) <= LOW_STOCK_THRESHOLD).sort((a,b)=>a.stock - b.stock);

  // Data para gráfico de barras (top 10 produtos por estoque)
  const topProducts = [...products].sort((a,b)=>b.stock - a.stock).slice(0,10);
  const chartData = {
    labels: topProducts.map(p => p.name),
    datasets: [
      {
        label: 'Estoque',
        data: topProducts.map(p => Number(p.stock)),
      }
    ]
  };

  return (
    <div className="page">
      <h2>Dashboard</h2>
      {loading ? <p>Carregando...</p> : (
        <>
          <section style={{ display:'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 18 }}>
            <div className="card" style={{ padding: 12 }}>
              <h3>Distribuição de Estoque (Top 10)</h3>
              <div style={{ height: 300 }}>
                <Bar data={chartData} />
              </div>
            </div>

            <div className="card" style={{ padding: 12 }}>
              <h3>Produtos com Baixo Estoque (&le; {LOW_STOCK_THRESHOLD})</h3>
              {lowStock.length === 0 ? <p>Nenhum produto com baixo estoque.</p> : (
                <ul>
                  {lowStock.map(p => (
                    <li key={p.id}>
                      <strong>{p.name}</strong> — Estoque: {p.stock}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="card" style={{ padding: 12 }}>
            <h3>Últimas Movimentações</h3>
            {movements.length === 0 ? <p>Sem movimentações recentes.</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 8 }}>Data</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Produto</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Tipo</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Qtd</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Antes</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Depois</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map(m => (
                    <tr key={m.id} style={{ borderTop: '1px solid #eee' }}>
                      <td style={{ padding: 8 }}>{new Date(m.createdAt).toLocaleString()}</td>
                      <td style={{ padding: 8 }}>{m.Product?.name || '—'}</td>
                      <td style={{ padding: 8 }}>{m.type}</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{m.quantity}</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{m.previousStock}</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{m.newStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
}
