import {Component} from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {Line} from 'rc-progress'
import RulesModal from '../RulesModel'
import Cells from '../Cells'

import './index.css'

class MemoryMatrix extends Component {
  state = {
    highlightedIndices: [],
    level: 1,
    progress: 0,
    results: true,
    progressPercentage: 0,
    startGame: true,
    timerId: 0,
    gridSize: 3,
    selectedCellsCount: 0,
  }

  componentDidMount() {
    this.getGridButtons(0)
    const timer = setInterval(() => this.setState({results: false}), 10000)
    this.setState({timerId: timer})
  }

  componentWillUnmount() {
    const {timerId} = this.state
    clearInterval(this.setState({timerId}))
  }

  getGridButtons = () => {
    const {gridSize} = this.state
    const myArray = Array.from(
      {length: gridSize * gridSize},
      (_, index) => index + 1,
    )

    const hiddenCellsList = []
      .concat(myArray)
      .sort(() => Math.random() - 0.5)
      .slice(0, gridSize)

    const currentLevelGridCells = myArray.map(value => ({
      id: Math.random().toString(),
      isHidden: hiddenCellsList.includes(value),
    }))

    this.setState({highlightedIndices: currentLevelGridCells})
  }

  toggleModel = () => {
    this.setState(prevState => ({
      isModelOpen: !prevState.isModelOpen,
    }))
  }

  onClickCell = isHidden => {
    const {level, selectedCellsCount} = this.state
    this.setState(prevState => ({
      selectedCellsCount: prevState.selectedCellsCount + 1,
    }))
    if (isHidden) {
      if (level + 3 === selectedCellsCount) {
        this.nextLevel()
      }
    } else {
      this.setState({results: false})
    }
  }

  nextLevel = () => {
    const {level} = this.state
    const maxLevel = 15
    const progressPercentage = (level / maxLevel) * 100

    this.setState(prevState => ({
      level: prevState.level + 1,
      progress: prevState.progress + 1,
      progressPercentage,
      gridSize: prevState.gridSize + 1,
      results: false,
    }))

    if (level === 15 || level === 10 || level === 9) {
      this.setState({results: false})
    }
  }

  onClickStartButton = () => {
    this.setState({results: true})
  }

  onClickStartPlaying = () => {
    this.setState({startGame: false})
  }

  onClickBackButton = () => {
    this.setState({startGame: true})
  }

  render() {
    const {
      highlightedIndices,
      isModelOpen,
      progressPercentage,
      level,
      results,
      startGame,
    } = this.state

    console.log(highlightedIndices)

    let content = null

    if (startGame) {
      content = (
        <div className="matrix-home-page">
          <div className="back-icon">
            <Link to="/" className="link">
              <button type="button" className="back-button">
                <BiArrowBack className="icon" />
                <p className="back">Back</p>
              </button>
            </Link>
          </div>
          <h1 className="game-heading">Memory Matrix</h1>
          <img
            src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1708572317/memory_1_bvfmai.png"
            alt="memory matrix"
            className="home-image"
          />
          <h1 className="home-rules">Rules</h1>
          <ul className="rules-list-container">
            <li>
              In each level of the Game, Users should be able to see the Grid
              with (N X N) size starting from 3 and the grid will highlight N
              cells in Blue, the N highlighted cells will be picked randomly.
            </li>
            <li>
              The highlighted cells will remain N seconds for the user to
              memorize the cells. At this point, the user should not be able to
              perform any action.
            </li>
            <li>
              After N seconds, the grid will clear the N highlighted cells.
            </li>
            <li>
              At N seconds, the user can click on any cell. Clicking on a cell
              that was highlighted before it will turn blue. Clicking on the
              other cells that were not highlighted before then will turn to
              red.
            </li>
            <li>
              The user should be promoted to the next level if they guess all N
              cells correctly in one attempt.
            </li>
            <li>
              The user should be taken to the results page if the user clicks on
              the wrong cell.
            </li>
            <li>
              If the user completed all the levels, then the user should be
              taken to the results page.
            </li>
          </ul>

          <button
            className="start-button"
            type="button"
            onClick={this.onClickStartPlaying}
          >
            Start playing
          </button>
        </div>
      )
    } else if (results) {
      content = (
        <div>
          <div className="game-rules-container">
            <div>
              <button
                type="button"
                className="game-back-button"
                onClick={this.onClickBackButton}
              >
                <BiArrowBack className="icon" />
                <p className="back">Back</p>
              </button>
            </div>

            <div>
              <RulesModal isOpen={isModelOpen} onClose={this.toggleModel} />

              <button
                type="button"
                className="rules-button"
                onClick={this.toggleModel}
              >
                Rules
              </button>
            </div>
          </div>

          <h1 className="game-heading">Memory Matrix</h1>

          <div className="level-container">
            <p className="level">Level - {level}</p>
            <p className="level">Max Level-00</p>
          </div>

          <div className="cells-card">
            <div className="game-container">
              <ul className="cells-list-container">
                {highlightedIndices.map(eachCell => (
                  <li className="cell-list" key={eachCell.id}>
                    <Cells
                      cellData={eachCell}
                      onClickCell={this.onClickCell}
                      level={level}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="result-container">
          <div className="result-emojis">
            <div>
              <img
                src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710758045/Neutral_Face_Emoji_smpepd.png"
                alt="neutral face"
                className="emoji-levels"
              />

              <img
                src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757988/Grinmacing_Face_Emoji_f4mh8w.png"
                alt="grimacing face"
                className="emoji-levels"
              />

              <img
                src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757989/Slightly_Smiling_Face_Emoji_gfj7iq.png"
                alt="slightly smiling face"
                className="emoji-levels"
              />

              <img
                src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757985/Smiling_Emoji_with_Eyes_Opened_zauypv.png"
                alt="grinning face with big eyes"
                className="emoji-levels"
              />

              <img
                src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757969/Smiling_With_Closed_Eyes_Emoji_Free_Download_IOS_Emojis_ex34ob.png"
                alt="grinning face with smiling eyes"
                className="emoji-levels"
              />

              <img
                src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710759132/emoticon-2120024_1280_vhvc3h.png"
                alt="beaming face with smiling eyes"
                className="emoji-levels"
              />

              <img
                src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757878/Smile_Emoji_yawgmz.png"
                alt="grinning face"
                className="emoji-levels"
              />

              <img
                src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757928/Sunglasses_Emoji_ycgfk6.png"
                alt="smiling face with sunglasses"
                className="emoji-levels"
              />
            </div>

            <hr className="hr" />

            <Line
              percent={progressPercentage}
              strokeWidth="2"
              strokeColor="#2db7f5"
              className="line"
            />

            <div className="level-show">
              <p className="levels-at">Level 1</p>

              <p className="levels-at">Level 5</p>

              <p className="levels-at">Level 10</p>

              <p className="levels-at">Level 15</p>
            </div>

            <h1 className="Congratulations">Congratulations</h1>

            <h1 className="level-heading">You have reached level {level}</h1>

            <button
              className="start-button"
              type="button"
              onClick={this.onClickStartButton}
            >
              Play Again
            </button>
          </div>
        </div>
      )
    }

    return <div className="memory-matrix-container">{content}</div>
  }
}

export default MemoryMatrix
