import { memo, useState, useEffect } from "react"

const CardForm = memo(({ editingCard, onSubmit, onCancel }) => {
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")

  useEffect(() => {
    if (editingCard) {
      setFront(editingCard.front)
      setBack(editingCard.back)
    } else {
      setFront("")
      setBack("")
    }
  }, [editingCard])

  const handleSubmit = () => {
    if (!front.trim() || !back.trim()) return
    onSubmit(front.trim(), back.trim())
    setFront("")
    setBack("")
  }

  const handleCancel = () => {
    setFront("")
    setBack("")
    onCancel()
  }

  return (
    <div className="card-form">
      <div className="input-group">
        <label>Вопрос / Термин</label>
        <input
          type="text"
          placeholder="Например: Столица Франции"
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Ответ / Определение</label>
        <input
          type="text"
          placeholder="Париж"
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />
      </div>
      <div className="actions-form">
        <button className="btn-primary" onClick={handleSubmit}>
          {editingCard ? "Сохранить" : "Создать карточку"}
        </button>
        {editingCard && (
          <button className="btn-secondary" onClick={handleCancel}>
            Отмена
          </button>
        )}
      </div>
    </div>
  )
})

CardForm.displayName = "CardForm"
export default CardForm
