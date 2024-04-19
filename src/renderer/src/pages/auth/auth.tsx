import { ChangeEvent, useEffect, useState } from 'react'
import './auth.scss'
import { useDispatch } from 'react-redux'
import { setName, setSum, setUser } from '../../store/userReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { sums } from '../Game/game'
import { useTypedSelector } from '../../store/store'
import { toggleEnableHelper } from '../../store/helpersReducer'

export default function Auth() {
  const [userName, setUserName] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [saveSum, setSaveSum] = useState(0)
  const helpers = useTypedSelector((state) => state.helpers)

  function submitHandler(e: React.FormEvent): void {
    e.preventDefault()
    if (userName.length == 0) {
      setError('Заполните поле имени')
    } else if (saveSum == 0) {
      setError('Выберите несгораемую сумму')
    } else {
      dispatch(setUser({ name: userName, sum: 0, save_sum: saveSum }))
      navigate('../game')
    }
  }

  useEffect(() => {
    if (userName != '') {
      setError('')
    }
  }, [userName, saveSum])

  // TODO дописать функцию чтоб работала
  function selectHelperClickHandle(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked == true) {
      console.log('hello world')
      if (helpers.filter((helper) => helper.isDisabled == false).length < 3) {
        dispatch(toggleEnableHelper(e.target.value))
      }
    } else {
      dispatch(toggleEnableHelper(e.target.value))
    }
  }

  return (
    <div id="auth">
      <Link to={'../'}>
        <FontAwesomeIcon icon={faHouse} size={'2xl'} />
      </Link>

      <h1>Вход</h1>

      <form
        onSubmit={submitHandler}
        className="flex fz-20 gap-20 flex-column justify-center align-center"
      >
        <label>
          <p>Введите имя</p>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label>

        <label>
          <p>Выберите несгораемую сумму</p>
          {sums.map((sum) => (
            <label>
              <input
                type="radio"
                name="sum"
                value={sum}
                checked={sum == saveSum}
                onChange={(e) => setSaveSum(+e.target.value)}
              />{' '}
              {sum}
            </label>
          ))}
        </label>
        <p>Выберите подсказки (не более 3 штук)</p>
        <label>
          {helpers.map((helper) => (
            <label>
              <input
                type="checkbox"
                value={helper.name}
                checked={!helper.isDisabled}
                onChange={selectHelperClickHandle}
              />
              {helper.name}
            </label>
          ))}
        </label>

        <input type="submit" value="Начать игру" />

        <div className="error-message">{error}</div>
      </form>
    </div>
  )
}
