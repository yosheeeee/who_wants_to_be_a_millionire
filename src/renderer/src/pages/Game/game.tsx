import { useEffect, useState } from 'react'
import GameLogoSrc from '../../assets/default-image.jpg'
import "./game.scss"
import { useDispatch } from 'react-redux'
import { setSum } from '../../store/userReducer'
import { useNavigate } from 'react-router-dom'

interface IQuestion {
  question_text: string,
  question_answer_1: string,
  question_answer_2: string,
  question_answer_3: string,
  question_answer_4: string,
  right_answer: number,
  question_level: number
}

export const sums = [500,1000,2000,3000,5000,10000,15000,25000,50000,100000,200000,400000,800000,1500000,3000000]

export default function Game() {
  const ipc = window.electron.ipcRenderer
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>()
  const [currentSum, setCurrentSum] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function answerClickHandler(e: React.MouseEvent<HTMLButtonElement>){
      if (e.target.value == currentQuestion.right_answer){
        setCurrentLevel(prevState => prevState + 1)
      }
      else{
        dispatch(setSum(currentSum))
        navigate('../game-over')
      }
  }

  useEffect(() => {
    setCurrentSum(sums[currentLevel -1])
      ipc.invoke('getRandomQuestion', currentLevel)
        .then(data => data as IQuestion)
        .then(data => setCurrentQuestion(data))
  }, [currentLevel])


  return (
    <div id="game">

      <div id="game-logo">
        <img src={GameLogoSrc}
             alt="game logo" />
      </div>

      <div className="header-container">
        <div className="current-sum">
          Текущая сумма: <span className="sum">{currentSum}</span>
        </div>

        <div className="help-buttons">

        </div>
      </div>

      <div className="question-container">

        <h4 className="fz-16">Вопрос:</h4>
        {
          currentQuestion ?
            <div className="question">
              {currentQuestion.question_text}
            </div>
            : <></>
        }
      </div>

      <div className="variants">
        {currentQuestion ?
          <>
            <button value={1} onClick={answerClickHandler}>
              {currentQuestion.question_answer_1}
            </button>
            <button value={2} onClick={answerClickHandler}>{currentQuestion.question_answer_2}</button>
            <button value={3} onClick={answerClickHandler}>{currentQuestion.question_answer_3}</button>
            <button value={4} onClick={answerClickHandler}>{currentQuestion.question_answer_4}</button>
          </>
          : <></>
        }
      </div>
    </div>
  )

}

