
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Header from './components/Header';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import CurrentUser from './context/CurrentUser'
import {useState} from 'react'
import SearchPage from './views/SearchPage';
import context from 'react-bootstrap/esm/AccordionContext';

function App() {
  axios.defaults.withCredentials = true
  const [currentUser, setCurrentUser] = useState()

  if (currentUser == null) {
    if (localStorage.getItem("user") !== null) {
      let user = JSON.parse(localStorage.getItem("user"))
      setCurrentUser(user)
    }
  }


  return (
    <BrowserRouter>
      <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/user/login" element={<LoginPage />}/>
        <Route path="/pokemon/search/:text" element={<SearchPage />}/>
      </Routes>
      </CurrentUser.Provider>
    </BrowserRouter >
  );
}

export default App;
