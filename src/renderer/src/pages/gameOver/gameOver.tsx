import { useTypedSelector } from '../../store/store'
import './gameover.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import GameOverAudio from "../../assets/sounds/game-over.mp3"

export default function GameOver() {
  const user = useTypedSelector((state) => state.user)
  const ipc = window.electron.ipcRenderer
  const gameOverAudio = new Audio(GameOverAudio)
  gameOverAudio.volume = 0.2
  gameOverAudio.play()
  function linkClickHandler() {
    ipc.send('saveUserData', user)
    gameOverAudio.pause()
  }



  return (
    <div id="game-over">
      <Link to={'../'} onClick={linkClickHandler}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <h1>Игра окончена</h1>
      <h2>Заработанная сумма: {user.sum}</h2>
    </div>
  )
}
