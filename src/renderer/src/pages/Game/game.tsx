import { useEffect, useState } from 'react'
import GameLogoSrc from '../../assets/default-image.jpg'
import './game.scss'
import { useDispatch } from 'react-redux'
import { setSum } from '../../store/userReducer'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../../store/store'
import {
  activateHelper,
  toggleEnableHelper,
  unactivateAllHelpers,
  unactivateHelper
} from '../../store/helpersReducer'
import ModalWindow, { getRandomArbitrary } from '../../components/modalWindow/modalWindow'
import { VictoryPie } from 'victory'
import RoundMusicSrc from '../../assets/sounds/level.mp3'
import RightAnswerMusicSrc from '../../assets/sounds/right-answer.mp3'
import WrongAnswerSoundSrc from '../../assets/sounds/wrong-answer.mp3'
import HelperSoundSrc from '../../assets/sounds/helper-sound.mp3'

interface IQuestion {
  question_text: string
  question_answer_1: string
  question_answer_2: string
  question_answer_3: string
  question_answer_4: string
  right_answer: number
  question_level: number
}

export const sums = [
  500, 1000, 2000, 3000, 5000, 10000, 15000, 25000, 50000, 100000, 200000, 400000, 800000, 1500000,
  3000000
]

export default function Game() {
  const ipc = window.electron.ipcRenderer

  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>()
  const [currentSum, setCurrentSum] = useState(0)
  const [answersDisabled, setAnswersDisabled] = useState([false, false, false, false])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const helpers = useTypedSelector((state) => state.helpers)
  // const [levelAudio, setLevelAudio] = useState(new Audio(RoundMusicSrc))
  const [rightAnswerAudio, setRightAnswerAudio] = useState(new Audio(RightAnswerMusicSrc))
  const [wrongAnswerAudio, setWrongAnswerAudio] = useState(new Audio(WrongAnswerSoundSrc))
  const [helperAudio, setHelperAudio] = useState(new Audio(HelperSoundSrc))

  // обработка нажатия на ответ
  function answerClickHandler(e: React.MouseEvent<HTMLButtonElement>, button_index: number): void {
    if (e.target?.value == currentQuestion?.right_answer) {
      setCurrentLevel((prevState) => prevState + 1)
      setRightAnswerAudio((state) => {
        state.play()
        return state
      })
    } else {
      wrongAnswerAudio.play()
      if (helpers[1].isActive) {
        setAnswersDisabled((prevState) => {
          const newState = [...prevState]
          newState[button_index] = true
          return newState
        })
        dispatch(unactivateHelper(helpers[1].name))
      } else {
        dispatch(setSum(currentSum))
        setRightAnswerAudio((prev) => {
          return null
        })
        setRightAnswerAudio((prev) => {
          return null
        })
        setHelperAudio(null)
        // setLevelAudio(null)
        navigate('../game-over')
      }
    }
  }

  function disableWrongAnswers(): void {
    setAnswersDisabled((prevState) => {
      return prevState.map((_v, index) => index != currentQuestion?.right_answer - 1)
    })
  }

  //подгрузка вопроса
  useEffect(() => {
    if (currentLevel == 1) {
      // setLevelAudio((prevState) => {
      //   prevState.play()
      //   return prevState
      // })
    }
    setCurrentSum(sums[currentLevel - 1])
    ipc
      .invoke('getRandomQuestion', currentLevel)
      .then((data) => data as IQuestion)
      .then((data) => setCurrentQuestion(data))
    setAnswersDisabled([false, false, false, false])
    dispatch(unactivateAllHelpers())
  }, [currentLevel])

  //обработка кнопок-подсказок
  useEffect(() => {
    // кнопка 50 на 50
    if (helpers[3].isActive) {
      let c = 0
      for (let i = 1; i < 5; i++) {
        if (i != currentQuestion?.right_answer) {
          setAnswersDisabled((prevState) => {
            const newState = [...prevState]
            newState[i - 1] = true
            return newState
          })
          c += 1
          if (c == 2) {
            break
          }
        }
      }
      dispatch(unactivateHelper(helpers[3].name))
    }

    //кнопка право на ошибку
    else if (helpers[1].isActive) {
      if (helpers[1].isDisabled == false) {
        dispatch(toggleEnableHelper(helpers[1].name))
      }
    }

    //кнопка замены вопроса
    else if (helpers[4].isActive) {
      ipc
        .invoke('getRandomQuestion', currentLevel)
        .then((data) => data as IQuestion)
        .then((data) => setCurrentQuestion(data))
        .finally(() => {
          dispatch(unactivateHelper(helpers[4].name))
        })
    } else if (helpers[2].isActive) {
      if (!helpers[2].isDisabled) {
        dispatch(toggleEnableHelper(helpers[2].name))
      }
    }
  }, [helpers])

  return (
    <div id="game">
      <div id="game-logo">
        <img src={GameLogoSrc} alt="game logo" />
      </div>

      <div className="header-container">
        <div className="current-sum">
          Текущая сумма: <span className="sum">{currentSum}</span>
        </div>

        <div className="help-buttons flex align-center gap-20">
          {helpers.map((helper, _index) => {
            if (helper.isDisabled == false) {
              return (
                // eslint-disable-next-line react/jsx-key
                <button
                  onClick={(e) => {
                    helperAudio.play()
                    dispatch(activateHelper(helper.name))
                  }}
                >
                  {helper.name}
                </button>
              )
            } else {
              return <></>
            }
          })}
        </div>
      </div>

      <div className="question-container">
        <h4 className="fz-16">Вопрос:</h4>
        {currentQuestion ? <div className="question">{currentQuestion.question_text}</div> : <></>}
      </div>

      <div className="variants">
        {currentQuestion ? (
          <>
            <button
              disabled={answersDisabled[0]}
              value={1}
              onClick={(e) => answerClickHandler(e, 0)}
            >
              1) {currentQuestion.question_answer_1}
            </button>
            <button
              disabled={answersDisabled[1]}
              value={2}
              onClick={(e) => answerClickHandler(e, 1)}
            >
              2) {currentQuestion.question_answer_2}
            </button>
            <button
              disabled={answersDisabled[2]}
              value={3}
              onClick={(e) => answerClickHandler(e, 2)}
            >
              3) {currentQuestion.question_answer_3}
            </button>
            <button
              disabled={answersDisabled[3]}
              value={4}
              onClick={(e) => answerClickHandler(e, 3)}
            >
              4) {currentQuestion.question_answer_4}
            </button>
          </>
        ) : (
          <></>
        )}
      </div>

      {helpers[0].isActive && currentQuestion ? (
        <HelpOfTheHall question={currentQuestion} />
      ) : (
        <></>
      )}

      {helpers[2].isActive ? <ModalWindow disableWrongAnswers={disableWrongAnswers} /> : ''}
    </div>
  )
}

function HelpOfTheHall({ question }: { question: IQuestion }) {
  const [answ1] = useState(
    question.right_answer == 1 ? getRandomArbitrary(20, 60) : getRandomArbitrary(1, 20)
  )
  const [answ2] = useState(
    question.right_answer == 2 ? getRandomArbitrary(20, 60) : getRandomArbitrary(1, 20)
  )
  const [answ3] = useState(
    question.right_answer == 3 ? getRandomArbitrary(20, 60) : getRandomArbitrary(1, 20)
  )
  const [answ4] = useState(
    question.right_answer == 4 ? getRandomArbitrary(20, 60) : getRandomArbitrary(1, 20)
  )

  return (
    <VictoryPie
      data={[
        { x: '1', y: answ1 },
        { x: '2', y: answ2 },
        { x: '3', y: answ3 },
        { x: '4', y: answ4 }
      ]}
      colorScale={['tomato', 'orange', 'gold', 'cyan']}
      animate={{ duration: 500 }}
      width={500}
      height={200}
      startAngle={90}
      endAngle={-90}
    />
  )
}
