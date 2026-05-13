import { Component } from "react"

class DeckSelector extends Component {
  handleAdd = () => {
    const name = prompt("Название новой колоды:")
    if (name && name.trim()) {
      this.props.onAdd(name.trim())
    }
  }

  render() {
    const { decks, currentDeckName, onSwitch } = this.props
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
        <button className="btn-secondary" onClick={this.handleAdd}>
          + Колода
        </button>
      </div>
    )
  }
}

export default DeckSelector
