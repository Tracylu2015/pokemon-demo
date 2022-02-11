
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import axios from 'axios'
import Navbar from './components/Navbar';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';

function App() {
  // axios.defaults.withCredentials = true

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/user/login" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
