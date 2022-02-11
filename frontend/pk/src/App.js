
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Navbar from './components/Navbar';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import CurrentUser from './context/CurrentUser'
import {useState} from 'react'
import SearchPage from './views/SearchPage';

function App() {
  axios.defaults.withCredentials = true
  const [currentUser, setCurrentUser] = useState()

  return (
    <BrowserRouter>
      <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      <Navbar />
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
