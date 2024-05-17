import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="home-container">
    <h1 className="games-heading">Games</h1>
    <ul className="card-show-container">
      <li className="game-card-container">
        <Link to="/emoji-game" className="link">
          {' '}
          {/* Link to Emoji Game Route */}
          <img
            src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1708572208/Asset_1_4x_1_1_vypqbi.png"
            alt="emoji game"
            className="emoji"
          />
          <h1 className="emoji-name">Emoji Game</h1>
        </Link>
      </li>

      <li className="game-card-container">
        <Link to="/memory-matrix" className="link">
          {/* Link to Memory Matrix Route */}
          <img
            src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1708572317/memory_1_bvfmai.png"
            alt="memory matrix"
            className="memory"
          />
          <h1 className="memory-name">Memory Matrix</h1>
        </Link>
      </li>

      <li className="game-card-container">
        <Link to="/rock-paper-scissor" className="link">
          {' '}
          {/* Link to Rock Paper Scissor Route */}
          <img
            src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1708572334/Group_7469_1_i9ovya.png"
            alt="rock paper scissor"
            className="rock"
          />
          <h1 className="memory-name">ROCK PAPER SCISSOR</h1>
        </Link>
      </li>

      <li className="game-card-container">
        <Link to="/card-flip-memory-game" className="link">
          {' '}
          {/* Link to Card-Flip Memory Game Route */}
          <img
            src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1708572327/Layer_2_yiiit6.png"
            alt="card flip memory game"
            className="flip"
          />
          <h1 className="memory-name">Flip Cart Game</h1>
        </Link>
      </li>
    </ul>
  </div>
)

export default Home
