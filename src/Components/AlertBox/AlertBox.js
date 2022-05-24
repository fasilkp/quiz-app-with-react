import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck} from '@fortawesome/free-solid-svg-icons'
import './AlertBox.css'
function AlertBox(props) {
  return (
    <div className="alert-box">
        <div className="alert-box-body">
            <div className="alertIcon">
                <FontAwesomeIcon icon={faListCheck} className="icon" />
            </div>
            <div className="quiz-score">
                <h1>Game Over</h1>
                <h2>Your Score : {props.score}/10</h2>
            </div>
            <div className="play-again">
                <button className="play-again-btn"
                onClick={() => window.location.reload(false)}
                >Play Again</button>
            </div>
        </div>
    </div>
  )
}

export default AlertBox