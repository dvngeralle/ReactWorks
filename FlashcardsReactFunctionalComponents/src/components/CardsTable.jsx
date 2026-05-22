import { memo } from "react"
import CardRow from "./CardRow"

const CardsTable = memo(({ deck, onDelete, onEdit, onToggleLearned }) => {
  return (
    <table id="cards-table">
      <thead>
        <tr>
          <th>Лицевая сторона</th>
          <th>Оборотная сторона</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {deck.map((card, index) => (
          <CardRow
            key={card.id}
            card={card}
            index={index}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleLearned={onToggleLearned}
          />
        ))}
      </tbody>
    </table>
  )
})

CardsTable.displayName = "CardsTable"
export default CardsTable
