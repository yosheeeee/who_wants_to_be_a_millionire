import './mainPage.scss'
import MainPageSrc from '../../assets/default-image.jpg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../store/userReducer'
import { disableAllHelpers } from '../../store/helpersReducer'

export default function MainPage(): JSX.Element {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearUser())
    dispatch(disableAllHelpers())
  }, [])
  return (
    <div id="main" className="flex justify-center align-center justify-center gap-20 flex-column">
      <img id="main-image" src={MainPageSrc} alt="main-image" />

      <div className="buttons flex align-center justify-center gap-20">
        <Link to={'./auth'} className="fz-30">
          Играть
        </Link>
        <Link to={'./top-table'} className="fz-30">
          Таблица лидеров
        </Link>
      </div>
    </div>
  )
}
