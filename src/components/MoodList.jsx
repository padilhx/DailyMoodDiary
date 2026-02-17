export default function MoodList({ moods, onUpdate, onDelete }) {
  if (!moods.length) return <p>Nenhum humor registrado.</p>;

  return (
    <ul>
      {moods.map((m) => (
        <li key={m.id} className="mood-item">
          <span>
            {m.day}, {m.date} - {m.emoji} - {m.comment}
          </span>
          <button
            onClick={() => {
              const newComment = prompt('Edite seu comentário:', m.comment);
              if (newComment) onUpdate(m.id, { comment: newComment });
            }}
          >
            Editar
          </button>
          <button onClick={() => onDelete(m.id)}>Apagar</button>
        </li>
      ))}
    </ul>
  );
}
