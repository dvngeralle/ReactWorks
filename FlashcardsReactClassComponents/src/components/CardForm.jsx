import { Component } from "react"

class CardForm extends Component {
  constructor(props) {
    super(props)
    this.state = { front: "", back: "" }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editingCard !== this.props.editingCard) {
      if (this.props.editingCard) {
        this.setState({
          front: this.props.editingCard.front,
          back: this.props.editingCard.back,
        })
      } else {
        this.setState({ front: "", back: "" })
      }
    }
  }

  handleSubmit = () => {
    const { front, back } = this.state
    if (!front.trim() || !back.trim()) return
    this.props.onSubmit(front.trim(), back.trim())
    this.setState({ front: "", back: "" })
  }

  handleCancel = () => {
    this.setState({ front: "", back: "" })
    this.props.onCancel()
  }

  render() {
    const { editingCard } = this.props
    const { front, back } = this.state
    return (
      <div className="card-form">
        <div className="input-group">
          <label>Вопрос / Термин</label>
          <input
            type="text"
            placeholder="Например: Столица Франции"
            value={front}
            onChange={(e) => this.setState({ front: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Ответ / Определение</label>
          <input
            type="text"
            placeholder="Париж"
            value={back}
            onChange={(e) => this.setState({ back: e.target.value })}
          />
        </div>
        <div className="actions-form">
          <button className="btn-primary" onClick={this.handleSubmit}>
            {editingCard ? "Сохранить" : "Создать карточку"}
          </button>
          {editingCard && (
            <button className="btn-secondary" onClick={this.handleCancel}>
              Отмена
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default CardForm
