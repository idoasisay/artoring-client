import React from 'react';
import '../../css/App.css';
import Nav from '../../components/PageNavi/pageNaviComponent';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <Nav />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
