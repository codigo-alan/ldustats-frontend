import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlayersPage } from "./pages/PlayersPage";
import { AddPlayerPage } from "./pages/AddPlayerPage";
import { PlayerDetailPage } from "./pages/PlayerDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NavigationComponent } from "./components/NavigationComponent";
import { Toaster } from "react-hot-toast";

export function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationComponent/>
        <Routes>
          <Route path='/' element={ <Navigate to='/players'/> }></Route>
          <Route path='/players' element={ <PlayersPage/> }></Route>
          <Route path='/players/:id' element={ <PlayerDetailPage/> }></Route>
          <Route path='/player-add' element={ <AddPlayerPage/> }></Route>
          <Route path='/not-found-route' element={ <NotFoundPage/> }></Route>
        </Routes>
        <Toaster></Toaster>
      </BrowserRouter>
    </>
  )
}