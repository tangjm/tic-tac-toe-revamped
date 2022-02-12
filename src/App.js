import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import './App.css';
import './css/Game.css';
import Game from './components/Game';
import LanguageContext, { initialLanguageContext } from './utils/languages';
import ColourThemeContext, { colourThemes } from './utils/colourThemes';

function App() {
  const [language, setLanguage] = useState("0");
  const [isLightTheme, setIsLightTheme] = useState(true);

  useLayoutEffect(() => {
    const bodyClassList = document.body.classList;
    // bodyClassList.toggle(colourThemes.dark);
    if (isLightTheme) {
      bodyClassList.remove(colourThemes.dark);
      bodyClassList.add(colourThemes.light);
    } else {
      bodyClassList.add(colourThemes.dark);
      bodyClassList.remove(colourThemes.light);
    // return;
    }
  }, [isLightTheme])

  const handleThemeChange = e => {
    setIsLightTheme(isLightTheme => !isLightTheme);
  }

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
        <ColourThemeContext.Provider value={{ isLightTheme, handleThemeChange }}>
          <Game />
        </ColourThemeContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
