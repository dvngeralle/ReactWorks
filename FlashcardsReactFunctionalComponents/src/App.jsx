import { useState, useEffect, useCallback } from "react"
import DeckSelector from "./components/DeckSelector"
import CardForm from "./components/CardForm"
import CardsTable from "./components/CardsTable"
import StudySection from "./components/StudySection"
import "./App.css"

const STORAGE_KEY = "flashcards-decks-v2"

const shuffleArray = (arr) =>
  [...arr]
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

export default function App() {
  const [decks, setDecks] = useState(null)
  const [currentDeckName, setCurrentDeckName] = useState("Основная")
  const [editingIndex, setEditingIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setDecks(JSON.parse(saved))
      return
    }

    setLoading(true)
    fetch("https://opentdb.com/api.php?amount=50&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const cards = data.results.map((item, i) => ({
          id: Date.now() + i,
          front: item.question,
          back: item.correct_answer,
          isLearned: false,
        }))
        const initialDecks = { Основная: cards }
        setDecks(initialDecks)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDecks))
      })
      .catch(() => {
        setError(
          "Не удалось загрузить карточки с сервера. Попробуйте обновить страницу.",
        )
        setDecks({ Основная: [] })
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!decks) return
    const interval = setInterval(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    }, 3000)
    return () => clearInterval(interval)
  }, [decks])

  const getCurrentDeck = useCallback(() => {
    return decks?.[currentDeckName] || []
  }, [decks, currentDeckName])

  const switchDeck = useCallback((name) => {
    setCurrentDeckName(name)
    setEditingIndex(null)
  }, [])

  const addDeck = useCallback((name) => {
    setDecks((prev) => ({ ...prev, [name]: [] }))
    setCurrentDeckName(name)
  }, [])

  const addOrUpdateCard = useCallback(
    (front, back) => {
      setDecks((prev) => {
        const deck = [...(prev[currentDeckName] || [])]
        if (editingIndex !== null) {
          deck[editingIndex] = { ...deck[editingIndex], front, back }
        } else {
          deck.push({ id: Date.now(), front, back, isLearned: false })
        }
        return { ...prev, [currentDeckName]: deck }
      })
      setEditingIndex(null)
    },
    [currentDeckName, editingIndex],
  )

  const deleteCard = useCallback(
    (index) => {
      setDecks((prev) => {
        const deck = [...prev[currentDeckName]]
        deck.splice(index, 1)
        return { ...prev, [currentDeckName]: deck }
      })
    },
    [currentDeckName],
  )

  const startEdit = useCallback((index) => {
    setEditingIndex(index)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingIndex(null)
  }, [])

  const toggleLearned = useCallback(
    (index) => {
      setDecks((prev) => {
        const deck = [...prev[currentDeckName]]
        deck[index] = { ...deck[index], isLearned: !deck[index].isLearned }
        return { ...prev, [currentDeckName]: deck }
      })
    },
    [currentDeckName],
  )

  const shuffleDeck = useCallback(() => {
    setDecks((prev) => ({
      ...prev,
      [currentDeckName]: shuffleArray(prev[currentDeckName] || []),
    }))
  }, [currentDeckName])

  if (loading) return <div className="loading">Загрузка карточек...</div>
  if (!decks) return null

  const deck = getCurrentDeck()
  const editingCard = editingIndex !== null ? deck[editingIndex] : null

  return (
    <div className="container">
      <h1>Умные Карточки</h1>
      {error && <div className="error-msg">{error}</div>}
      <DeckSelector
        decks={decks}
        currentDeckName={currentDeckName}
        onSwitch={switchDeck}
        onAdd={addDeck}
      />
      <CardForm
        editingCard={editingCard}
        onSubmit={addOrUpdateCard}
        onCancel={cancelEdit}
      />
      <div className="table-header">
        <h2>Колода</h2>
        <button className="btn-secondary" onClick={shuffleDeck}>
          Перемешать колоду
        </button>
      </div>
      <CardsTable
        deck={deck}
        onDelete={deleteCard}
        onEdit={startEdit}
        onToggleLearned={toggleLearned}
      />
      <StudySection deck={deck} />
    </div>
  )
}
