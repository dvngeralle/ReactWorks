import { memo, useState, useCallback } from "react"

const StudySection = memo(({ deck }) => {
  const [studyIndex, setStudyIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [onlyUnlearned, setOnlyUnlearned] = useState(true)

  const getStudyCards = useCallback(() => {
    return onlyUnlearned ? deck.filter((c) => !c.isLearned) : deck
  }, [deck, onlyUnlearned])

  const studyCards = getStudyCards()
  const safeIndex = studyIndex >= studyCards.length ? 0 : studyIndex
  const card = studyCards[safeIndex] || null

  const handlePrev = useCallback(() => {
    setStudyIndex((prev) => Math.max(0, prev - 1))
    setIsFlipped(false)
  }, [])

  const handleNext = useCallback(() => {
    setStudyIndex((prev) => Math.min(studyCards.length - 1, prev + 1))
    setIsFlipped(false)
  }, [studyCards.length])

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  const handleToggleUnlearned = useCallback(() => {
    setOnlyUnlearned((prev) => !prev)
    setStudyIndex(0)
    setIsFlipped(false)
  }, [])

  const handleShuffle = useCallback(() => {
    setStudyIndex(0)
    setIsFlipped(false)
  }, [])

  return (
    <div className="study-section">
      <div className="study-header">
        <h3>Режим изучения</h3>
        <div className="study-controls">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={onlyUnlearned}
              onChange={handleToggleUnlearned}
            />
            Только невыученные
          </label>
          <button className="btn-secondary" onClick={handleShuffle}>
            Перемешать
          </button>
        </div>
      </div>

      <div
        className={`card-display ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        {card ? (isFlipped ? card.back : card.front) : "Нет карточек"}
      </div>

      <div className="position">
        {studyCards.length > 0
          ? `${safeIndex + 1} / ${studyCards.length}`
          : "0 / 0"}
      </div>

      <div className="controls">
        <button
          className="btn-secondary nav-btn"
          onClick={handlePrev}
          disabled={safeIndex === 0}
        >
          Назад
        </button>
        <button className="btn-primary nav-btn" onClick={handleFlip}>
          Перевернуть
        </button>
        <button
          className="btn-secondary nav-btn"
          onClick={handleNext}
          disabled={safeIndex >= studyCards.length - 1}
        >
          Вперед
        </button>
      </div>
    </div>
  )
})

StudySection.displayName = "StudySection"
export default StudySection
