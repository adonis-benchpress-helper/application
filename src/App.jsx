import React from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';

import './App.css';


const App = () => {
  let a = 1;
  return (
    <div>
      <h1>Hello world {a}</h1>
    </div>
  )
}

export default App;