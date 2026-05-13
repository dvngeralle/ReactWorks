import { Component } from "react"

class StudySection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studyIndex: 0,
      isFlipped: false,
      onlyUnlearned: true,
    }
  }

  getStudyCards = () => {
    const { deck } = this.props
    return this.state.onlyUnlearned ? deck.filter((c) => !c.isLearned) : deck
  }

  handlePrev = () => {
    this.setState((prev) => ({
      studyIndex: Math.max(0, prev.studyIndex - 1),
      isFlipped: false,
    }))
  }

  handleNext = () => {
    const max = this.getStudyCards().length - 1
    this.setState((prev) => ({
      studyIndex: Math.min(max, prev.studyIndex + 1),
      isFlipped: false,
    }))
  }

  handleFlip = () => {
    this.setState((prev) => ({ isFlipped: !prev.isFlipped }))
  }

  handleShuffle = () => {
    this.setState({ studyIndex: 0, isFlipped: false })
  }

  render() {
    const { studyIndex, isFlipped, onlyUnlearned } = this.state
    const studyCards = this.getStudyCards()
    const card = studyCards[studyIndex] || null

    return (
      <div className="study-section">
        <div className="study-header">
          <h3>Режим изучения</h3>
          <div className="study-controls">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={onlyUnlearned}
                onChange={() =>
                  this.setState({
                    onlyUnlearned: !onlyUnlearned,
                    studyIndex: 0,
                  })
                }
              />
              Только невыученные
            </label>
            <button className="btn-secondary" onClick={this.handleShuffle}>
              Перемешать
            </button>
          </div>
        </div>

        <div
          className={`card-display ${isFlipped ? "flipped" : ""}`}
          onClick={this.handleFlip}
        >
          {card ? (isFlipped ? card.back : card.front) : "Нет карточек"}
        </div>

        <div className="position">
          {studyCards.length > 0
            ? `${studyIndex + 1} / ${studyCards.length}`
            : "0 / 0"}
        </div>

        <div className="controls">
          <button
            className="btn-secondary nav-btn"
            onClick={this.handlePrev}
            disabled={studyIndex === 0}
          >
            Назад
          </button>
          <button className="btn-primary nav-btn" onClick={this.handleFlip}>
            Перевернуть
          </button>
          <button
            className="btn-secondary nav-btn"
            onClick={this.handleNext}
            disabled={studyIndex >= studyCards.length - 1}
          >
            Вперед
          </button>
        </div>
      </div>
    )
  }
}

export default StudySection
