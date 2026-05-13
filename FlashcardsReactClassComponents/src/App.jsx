import { Component } from "react"
import DeckSelector from "./components/DeckSelector"
import CardForm from "./components/CardForm"
import CardsTable from "./components/CardsTable"
import StudySection from "./components/StudySection"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    const saved = JSON.parse(localStorage.getItem("flashcards-decks")) || {
      Основная: [],
    }
    this.state = {
      decks: saved,
      currentDeckName: "Основная",
      editingIndex: null,
    }
  }

  componentDidMount() {
    this.saveInterval = setInterval(() => {
      localStorage.setItem("flashcards-decks", JSON.stringify(this.state.decks))
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.saveInterval)
  }

  getCurrentDeck = () => this.state.decks[this.state.currentDeckName] || []

  switchDeck = (name) => {
    this.setState({ currentDeckName: name, editingIndex: null })
  }

  addDeck = (name) => {
    this.setState((prev) => ({
      decks: { ...prev.decks, [name]: [] },
      currentDeckName: name,
    }))
  }

  addOrUpdateCard = (front, back) => {
    const { currentDeckName, editingIndex } = this.state
    this.setState((prev) => {
      const deck = [...(prev.decks[currentDeckName] || [])]
      if (editingIndex !== null) {
        deck[editingIndex] = { ...deck[editingIndex], front, back }
      } else {
        deck.push({ id: Date.now(), front, back, isLearned: false })
      }
      return {
        decks: { ...prev.decks, [currentDeckName]: deck },
        editingIndex: null,
      }
    })
  }

  deleteCard = (index) => {
    const { currentDeckName } = this.state
    this.setState((prev) => {
      const deck = [...prev.decks[currentDeckName]]
      deck.splice(index, 1)
      return { decks: { ...prev.decks, [currentDeckName]: deck } }
    })
  }

  startEdit = (index) => {
    this.setState({ editingIndex: index })
  }

  cancelEdit = () => {
    this.setState({ editingIndex: null })
  }

  toggleLearned = (index) => {
    const { currentDeckName } = this.state
    this.setState((prev) => {
      const deck = [...prev.decks[currentDeckName]]
      deck[index] = { ...deck[index], isLearned: !deck[index].isLearned }
      return { decks: { ...prev.decks, [currentDeckName]: deck } }
    })
  }

  shuffleDeck = () => {
    const { currentDeckName } = this.state
    this.setState((prev) => {
      const deck = [...prev.decks[currentDeckName]]
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
      return { decks: { ...prev.decks, [currentDeckName]: deck } }
    })
  }

  render() {
    const { decks, currentDeckName, editingIndex } = this.state
    const deck = this.getCurrentDeck()
    const editingCard = editingIndex !== null ? deck[editingIndex] : null

    return (
      <div className="container">
        <h1>Умные Карточки</h1>
        <DeckSelector
          decks={decks}
          currentDeckName={currentDeckName}
          onSwitch={this.switchDeck}
          onAdd={this.addDeck}
        />
        <CardForm
          editingCard={editingCard}
          onSubmit={this.addOrUpdateCard}
          onCancel={this.cancelEdit}
        />
        <div className="table-header">
          <h2>Колода</h2>
          <button className="btn-secondary" onClick={this.shuffleDeck}>
            Перемешать колоду
          </button>
        </div>
        <CardsTable
          deck={deck}
          onDelete={this.deleteCard}
          onEdit={this.startEdit}
          onToggleLearned={this.toggleLearned}
        />
        <StudySection deck={deck} />
      </div>
    )
  }
}

export default App
