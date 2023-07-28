import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlayersPage } from "./pages/PlayersPage";
import { SessionsPage } from "./pages/SessionsPage";
import { FilesPage } from "./pages/FilesPage";
import { AddPlayerPage } from "./pages/AddPlayerPage";
import { PlayerDetailPage } from "./pages/PlayerDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NavigationComponent } from "./components/navigationComponent/NavigationComponent";
import { Toaster } from "react-hot-toast";
import { FileDetailPage } from './pages/FilesDetailPage';
import { SessionPlayerDetail } from './pages/SessionPlayerDetail';


export function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationComponent />
        <Routes>
          <Route path='/' element={<Navigate to='/players' />}></Route>
          <Route path='/players' element={<PlayersPage />}></Route>
          <Route path='/sessions' element={<SessionsPage/>}></Route>
          <Route path='/files' element={<FilesPage/>}></Route>
          <Route path='/players/:id' element={<PlayerDetailPage />}></Route>
          <Route path='/player-add' element={<AddPlayerPage />}></Route>
          <Route path='/files/:id' element={<FileDetailPage />}></Route>
          <Route path='/files/:id/:idplayer' element={<SessionPlayerDetail />}></Route>
          <Route path='/not-found-route' element={<NotFoundPage />}></Route>
        </Routes>
        <Toaster></Toaster>
      </BrowserRouter>
    </>
  )
}