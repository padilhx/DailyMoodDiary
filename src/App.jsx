import { useState, useEffect } from 'react';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function App() {
  const STORAGE_KEY = 'moods-v1';
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setMoods(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(moods));
  }, [moods]);

  const addMood = (mood) => setMoods((prev) => [...prev, mood]);
  const updateMood = (id, updates) =>
    setMoods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  const deleteMood = (id) =>
    setMoods((prev) => prev.filter((m) => m.id !== id));

  // Função para frase motivacional
  const getWeeklyMessage = () => {
    if (moods.length < 5) return null;

    const lastFive = moods.slice(-5);
    const score = lastFive.reduce((sum, m) => {
      if (m.emoji === '😡') return sum + 1;
      if (m.emoji === '😔') return sum + 2;
      if (m.emoji === '😐') return sum + 3;
      return sum + 4; // 😀 ou 😊
    }, 0);

    const average = score / 5;

    if (average <= 1.5)
      return 'Semana muito ruim 😢 Força, dias melhores virão!';
    if (average <= 2) return 'Semana ruim 😔 Não desanime!';
    if (average <= 3) return 'Semana mais ou menos 😐 Vamos melhorar!';
    if (average <= 3.5) return 'Semana feliz 😊 Continue assim!';
    return 'Semana muito boa 😄 Que continue assim!';
  };

  return (
    <>
      {/* Caixa principal */}
      <div className="container">
        <h1>📔 Diário de Humor</h1>
        <MoodForm onAdd={addMood} />
        <MoodList moods={moods} onUpdate={updateMood} onDelete={deleteMood} />
      </div>

      {/* Footer / seção separada */}
      {moods.length > 0 && (
        <div className="footer-container">
          <div className="chart-box">
            <h3>Resumo gráfico</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                data={moods.map((m, i) => ({
                  name: i + 1,
                  value:
                    m.emoji === '😡'
                      ? 1
                      : m.emoji === '😔'
                      ? 2
                      : m.emoji === '😐'
                      ? 3
                      : 4, // 😀 ou 😊
                }))}
              >
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={30}>
                  {moods.map((m, index) => {
                    let color;
                    if (['😀', '😊'].includes(m.emoji))
                      color = '#82ca9d'; // verde
                    else if (['😐', '😔'].includes(m.emoji))
                      color = '#ffd966'; // amarelo
                    else color = '#ff6961'; // vermelho
                    return <Cell key={index} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {moods.length >= 5 && (
            <div className="message-box">
              <p>{getWeeklyMessage()}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
