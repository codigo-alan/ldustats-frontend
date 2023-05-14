import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlayersPage } from "./pages/PlayersPage";
import { AddPlayerPage } from "./pages/AddPlayerPage";
import { NavigationComponent } from "./components/NavigationComponent";

export function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationComponent/>
        <Routes>
          <Route path='/' element={ <Navigate to='/players'/> }></Route>
          <Route path='/players' element={ <PlayersPage/> }></Route>
          <Route path='/player-add' element={ <AddPlayerPage/> }></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}