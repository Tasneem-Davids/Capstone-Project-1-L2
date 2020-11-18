import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Game from './Components/Game';
import Instructions from './Components/Instructions';
import Main from './Components/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route exact={true} path="/" component={Main}/>
      <Route path="/Instructions" component={Instructions}/>
      <Route path="/Game" component={Game}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
