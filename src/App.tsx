import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Header } from './header';
import { NewThread } from './newThread';
import { Thread } from './thread';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <body>
          <Routes>
            <Route path='/' element={<Thread />} />
            <Route path='thread'>
              <Route path='new' element={<NewThread />} />
            </Route>
          </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
