
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import axios from 'axios'
import Navbar from './components/Navbar';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';

function App() {
  // axios.defaults.withCredentials = true

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/user/login" exact>
          <LoginPage />
        </Route>

      </Switch>
    </BrowserRouter >
  );
}

export default App;
