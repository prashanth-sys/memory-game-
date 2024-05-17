import {Component} from 'react'
import './index.css'

class Cells extends Component {
  state = {shouldShowHiddenCells: true, isClickedOnCell: false, timerId: 0}

  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({shouldShowHiddenCells: false})
    }, 3000)
    this.setState({timerId: timer})
  }

  componentWillUnmount() {
    const {timerId} = this.state
    clearInterval(timerId)
  }

  onClickCellButton = () => {
    const {cellData, onClickCell} = this.props
    const {shouldShowHiddenCells} = this.state

    if (!shouldShowHiddenCells) {
      this.setState({isClickedOnCell: true})
      if (cellData.isHidden) {
        onClickCell(true)
      } else {
        onClickCell(false)
      }
    }
  }

  render() {
    const {cellData} = this.props
    const {shouldShowHiddenCells, isClickedOnCell} = this.state
    const isActive = cellData.isHidden && shouldShowHiddenCells
    const isFailed = cellData.isHidden === false && isClickedOnCell === true

    let backgroundColor
    if (isActive) {
      backgroundColor = 'yellow'
    } else if (isFailed) {
      backgroundColor = 'red'
    } else {
      backgroundColor = '#cbd5e1'
    }

    return (
      <button
        aria-label="Close Modal"
        data-testid={cellData.isHidden ? 'highlighted' : 'notHighlighted'}
        type="button"
        style={{backgroundColor}}
        onClick={this.onClickCellButton}
        id={cellData.id}
        className="cells"
      >
        .
      </button>
    )
  }
}
export default Cells
