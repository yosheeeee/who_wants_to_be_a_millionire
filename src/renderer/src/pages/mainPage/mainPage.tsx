import './mainPage.scss'
import MainPageSrc from '../../assets/default-image.jpg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../store/userReducer'
import { disableAllHelpers } from '../../store/helpersReducer'
import MainPageSound from "../../assets/sounds/main-page.mp3"

export default function MainPage(): JSX.Element {
  const dispatch = useDispatch()
  const audio = new Audio(MainPageSound)
  audio.volume = 0.2


  useEffect(() => {
    dispatch(clearUser())
    dispatch(disableAllHelpers())
    audio.play()
  }, [])

  function stopMusicOnLeaving(){
    audio.pause()
  }

  return (
    <div id="main" className="flex justify-center align-center justify-center gap-20 flex-column">
      <img id="main-image" src={MainPageSrc} alt="main-image" />

      <div className="buttons flex align-center justify-center gap-20">
        <Link to={'./auth'} className="fz-30" onClick={stopMusicOnLeaving}>
          Играть
        </Link>
        <Link to={'./top-table'} className="fz-30" onClick={stopMusicOnLeaving}>
          Таблица лидеров
        </Link>
      </div>
    </div>
  )
}
