import { Link } from "react-router-dom";
import "./toptable.scss"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

interface IUser{
  user_name: string,
  user_record: number
}

export default function TopTalbe(){
  const ipc = window.electron.ipcRenderer

  useEffect(() => {
    ipc.invoke('getUserTopList')
      .then(data => data as IUser)
      .then(data => setUsers(data))
  }, []);

  const [users, setUsers]  = useState<IUser[]>([]);

  return (
    <section id="top-table">
      <h2>
        <Link to='../'><FontAwesomeIcon icon={faHouse}/></Link>
      </h2>
      <h1>Таблица лидеров</h1>
      {
        users.length === 0 ?

          <h2>Таблица пуста</h2>
          :
          <table>
            <thead>
              <tr>
                <td></td>
                <td>
                  Имя
                </td>
                <td>
                  Сумма
                </td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (<tr>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.user_record}</td>
              </tr>)
              )}
            </tbody>
          </table>
      }
    </section>
  )
}
