import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { unactivateHelper } from '../../store/helpersReducer'
import TimeLimitSound from '../../assets/sounds/time-limit.mp3'

export function getRandomArbitrary(min, max): number {
  return Math.floor(Math.random() * (max - min) + min)
}

export default function ModalWindow({
  disableWrongAnswers
}: {
  disableWrongAnswers: () => void
}): JSX.Element {
  const [randomPhone] = useState(getRandomArbitrary(10000000000, 100000000000))
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const [seconds, setSeconds] = useState(10)
  const [isEnded, setIsEnded] = useState(false)
  const timeLimitAudio = new Audio(TimeLimitSound)
  timeLimitAudio.volume = 0.2

  function tick() {
    if (isEnded) {
      return
    }
    if (seconds > 0) {
      setSeconds((prevState) => prevState - 1)
    } else {
      setIsEnded(true)
    }
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  })

  useEffect(() => {
    if (isEnded) {
      timeLimitAudio.play()
      dispatch(unactivateHelper('Звонок другу'))
    }
  }, [isEnded])

  useEffect(() => {
    setError('')
  }, [userInput])

  function submitHandler(e: React.FormEvent): void {
    e.preventDefault()
    if (randomPhone != +userInput) {
      setError('Телефоны не совпадают')
    } else {
      disableWrongAnswers()
      dispatch(unactivateHelper('Звонок другу'))
    }
  }

  return (
    <div id="blur">
      <div id="modal-window">
        <div className="timer"></div>
        <h4>Время: {seconds}</h4>
        <h4>Наберите телефон: {randomPhone}</h4>
        <form onSubmit={submitHandler}>
          <input type="number" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          <input type="submit" value="Подтвердить" />
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  )
}
