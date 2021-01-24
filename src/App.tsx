import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Test from './components/Test'
import { GlobalStyled } from './content/styles/Styled'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GlobalStyled>
          <Test />
        </GlobalStyled>
      </header>
    </div>
  );
}