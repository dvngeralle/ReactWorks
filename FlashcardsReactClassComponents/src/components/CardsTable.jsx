import { Component } from "react"

class CardsTable extends Component {
  render() {
    const { deck, onDelete, onEdit, onToggleLearned } = this.props
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
            <tr key={card.id}>
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
          ))}
        </tbody>
      </table>
    )
  }
}

export default CardsTable
