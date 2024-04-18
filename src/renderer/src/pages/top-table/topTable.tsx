import { Link } from "react-router-dom";
import "./toptable.scss"
import { useState } from "react";

interface IUser{
  name: string,
  sum: number
}

export default function TopTalbe(){
  const [users, setUsers]  = useState<IUser[]>([{
    name: "Кирилл",
    sum: 5,
  }]);
  return (
    <section id="top-table">
      <h1><Link to='../'>Назад</Link> Таблица лидеров</h1>
      {
        users.length === 0 ?

          <h2>Таблица пуста</h2>

          :

          <table>
            <thead>
              <tr>
                <td>
                  Имя
                </td>
                <td>
                  Сумма
                </td>
              </tr>
            </thead>
            <tbody>
              {users.map(user => <tr>
                <td>{user.name}</td>
                <td>{user.sum}</td>
              </tr>)}
            </tbody>
          </table>
      }
    </section>
  )
}
