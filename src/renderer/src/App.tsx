import { HashRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage";
import "./style.scss"
import TopTalbe from "./pages/top-table/topTable";
import Auth from './pages/auth/auth'
import { Provider } from 'react-redux'
import store from "./store/store"
import Game from './pages/Game/game'
import GameOver from './pages/gameOver/gameOver'

function App(): JSX.Element {
  return (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/"
               index={true}
               element={<MainPage/>} />
        <Route path="/top-table"
               element={<TopTalbe/>}/>
        <Route path='/auth'
               element={<Auth/>}/>
        <Route path='/game'
               element={<Game/>}/>
        <Route path='/game-over'
               element={<GameOver/>}/>
      </Routes>
    </HashRouter>
  </Provider>
  );
}

export default App;
