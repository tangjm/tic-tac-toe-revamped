import React from 'react';
import { useState } from 'react';
import './App.css';
import './css/Game.css';
import Game from './components/Game';
import LanguageContext, { initialLanguageContext } from './utils/languages';

function App() {
  const [language, setLanguage] = useState("0");

  const determineLanguageContext = () => {
    switch (language) {
      case "0":
        return {
          ...initialLanguageContext,
          currentLanguage: initialLanguageContext.availableLanguages[0],
          setLanguage
        }
      case "1":
        return {
          ...initialLanguageContext,
          currentLanguage: initialLanguageContext.availableLanguages[1],
          setLanguage
        }
      case "2":
        return {
          ...initialLanguageContext,
          currentLanguage: initialLanguageContext.availableLanguages[2],
          setLanguage
        }
      default:
        return;
    }
  }

  return (
    <div className="App">
      <LanguageContext.Provider value={determineLanguageContext()}>
        <div className="titleContainer">
          <h1 className='title'>Tic Tac Toe</h1>
          <span className="title-descrip">Revamped</span>
        </div>
        <Game />
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
