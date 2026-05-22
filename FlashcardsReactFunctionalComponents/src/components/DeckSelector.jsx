import { memo, useCallback } from "react"

const DeckSelector = memo(({ decks, currentDeckName, onSwitch, onAdd }) => {
  const handleAdd = useCallback(() => {
    const name = prompt("Название новой колоды:")
    if (name && name.trim()) onAdd(name.trim())
  }, [onAdd])

  return (
    <div className="deck-selector">
      {Object.keys(decks).map((name) => (
        <div
          key={name}
          className={`deck-tab ${name === currentDeckName ? "active" : ""}`}
          onClick={() => onSwitch(name)}
        >
          {name}
        </div>
      ))}
      <button className="btn-secondary" onClick={handleAdd}>
        + Колода
      </button>
    </div>
  )
})

DeckSelector.displayName = "DeckSelector"
export default DeckSelector
