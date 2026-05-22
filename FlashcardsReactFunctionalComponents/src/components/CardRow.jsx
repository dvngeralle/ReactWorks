import { memo } from "react"

const CardRow = memo(({ card, index, onDelete, onEdit, onToggleLearned }) => {
  return (
    <tr>
      <td>{card.front}</td>
      <td>{card.back}</td>
      <td>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.isLearned}
            onChange={() => onToggleLearned(index)}
          />
          {card.isLearned ? "Выучено" : "Учить"}
        </label>
      </td>
      <td>
        <button className="btn-secondary" onClick={() => onEdit(index)}>
          Редакт.
        </button>
        <button className="btn-danger" onClick={() => onDelete(index)}>
          Удалить
        </button>
      </td>
    </tr>
  )
})

CardRow.displayName = "CardRow"
export default CardRow
