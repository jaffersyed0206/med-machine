import React from 'react';
import './App.css';
import {BrowserRouter , Route} from 'react-router-dom';
import FrontHome from './component/FrontHome';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path = '/' component = {FrontHome} exact /> 
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
