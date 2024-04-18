import { HashRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage";
import "./style.scss"
import TopTalbe from "./pages/top-table/topTable";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  return (
    <HashRouter>
      <Routes>
        <Route path="/"
               index={true}
               element={<MainPage/>} />
        <Route path="/top-table"
               element={<TopTalbe/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
