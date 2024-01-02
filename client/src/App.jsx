import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlayersPage } from "./pages/playersPage/PlayersPage";
import { SessionsPage } from "./pages/sessionsPage/SessionsPage";
import { FilesPage } from "./pages/filesPage/FilesPage";
import { AddPlayerPage } from "./pages/addPlayerPage/AddPlayerPage";
import { PlayerDetailPage } from "./pages/playerDetailPage/PlayerDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NavigationComponent } from "./components/navigationComponent/NavigationComponent";
import { Toaster } from "react-hot-toast";
import { FileDetailPage } from './pages/filesDetailPage/FilesDetailPage';
import { SessionPlayerDetail } from './pages/sessionPlayerDetail/SessionPlayerDetail';
import { LoginPage } from "./pages/loginPage/LoginPage";
import { RegisterPage } from "./pages/registerPage/RegisterPage";
import { TeamsPage } from './pages/teamsPage/TeamsPage';


export function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationComponent />
        <Routes>
          <Route path='/' element={<Navigate to='/login' />}></Route>
          <Route path='/players' element={<PlayersPage />}></Route>
          <Route path='/sessions' element={<SessionsPage/>}></Route>
          <Route path='/files' element={<FilesPage/>}></Route>
          <Route path='/players/:id' element={<PlayerDetailPage />}></Route>
          <Route path='/player-add' element={<AddPlayerPage />}></Route>
          <Route path='/files/:id' element={<FileDetailPage />}></Route>
          <Route path='/files/:id/:idplayer' element={<SessionPlayerDetail />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/user-add' element={<RegisterPage />}></Route>
          <Route path='/not-found-route' element={<NotFoundPage />}></Route>
        </Routes>
        <Toaster></Toaster>
      </BrowserRouter>
    </>
  )
}