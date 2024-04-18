import "./mainPage.scss"
import MainPageSrc from "../../assets/default-image.jpg"
import { Link } from "react-router-dom";

export default function MainPage() : JSX.Element {
  return (
    <div id="main" className="flex align-center justify-center gap-20 flex-column">
      <img id='main-image' src={MainPageSrc}
           alt="main-image"/>

      <div className="buttons flex align-center justify-center gap-20">
        <Link to={'./game'} className='fz-30'>Играть</Link>
        <Link to={'./top-table'} className='fz-30'>Таблица лидеров</Link>
      </div>

    </div>
  )
}
