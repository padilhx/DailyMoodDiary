import { useState } from 'react';

export default function MoodForm({ onAdd }) {
  const [emoji, setEmoji] = useState('😊');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const date = new Date();
    const days = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    const moodData = {
      id: Date.now(),
      emoji,
      comment,
      date: date.toLocaleDateString(),
      day: days[date.getDay()],
    };

    onAdd(moodData);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={emoji} onChange={(e) => setEmoji(e.target.value)}>
        <option>😀</option>
        <option>😐</option>
        <option>😔</option>
        <option>😡</option>
      </select>
      <input
        type="text"
        placeholder="Como você está se sentindo?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
